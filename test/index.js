import _ from 'lodash';
import { expect } from 'chai';
import { name, version } from '../package.json';
import NodeMWSClient from '../lib';
import Resource from '../lib/resource';
import { MultipleProducts, SingleProduct } from './fixtures';

const credentials = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_KEY,
  sellerId: process.env.SELLER_ID
};

describe(`${name}:${version} -------- CLIENT`, () => {
  describe('constructor', () => {
    it('should create a client.', () => {
      expect(() => new NodeMWSClient(credentials)).to.not.throw();
    });
  });

  describe('request', () => {
    const client = new NodeMWSClient(credentials);

    it('should check Product:GetServiceStatus.', async () => {
      const response = await client.request({
        path: '/Products/2011-10-01',
        query: {
          Action: 'GetServiceStatus',
          Version: '2011-10-01'
        }
      });

      expect(response).to.be.an('object');
      expect(response)
        .to.have.deep.property('GetServiceStatusResponse.GetServiceStatusResult.Status');
    });
  });

  describe('feeds', () => {
    const client = new NodeMWSClient(credentials);

    it('should have a feeds resource.', () => {
      expect(client).to.have.property('feeds').that.is.an('object');
      _.map(client.feeds, (action) => {
        expect(action).to.be.an.instanceof(Resource);
      });
    });

    it.skip('should be able to submit a single product feed.', async () => {
      const response = await client.feeds.submitFeed.exec({
        feedContent: {
          MessageType: 'Product',
          MessageBody: SingleProduct,
          OperationType: 'Update'
        }
      });

      expect(response)
        .to.have.deep.property('SubmitFeedResponse.SubmitFeedResult.FeedSubmissionInfo');
    });

    it.skip('should be able to submit multiples products in one feed.', async () => {
      const response = await client.feeds.submitFeed.exec({
        feedContent: {
          MessageType: 'Product',
          MessageBody: MultipleProducts,
          OperationType: 'Update'
        }
      });

      expect(response)
        .to.have.deep.property('SubmitFeedResponse.SubmitFeedResult.FeedSubmissionInfo');
    });
  });
});
