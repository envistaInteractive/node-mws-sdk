import _ from 'lodash';
import crypto from 'crypto';
import axios from 'axios';
import parser from 'xml2json';
import qs from 'querystring';
import { inspect } from 'util';
import * as models from './models';
import Resource from './resource';
import resources from './resources';
import { version, name } from '../package.json';

export {
  models
};

const defaults = {
  APP_ID: name,
  APP_VERSION_ID: version,
  HOST: 'mws.amazonservices.com',
  PORT: 443
};

export default class NodeMWSClient {
  constructor(props) {
    this.appId = props.appId || defaults.APP_ID;
    this.appVersionId = props.appVersionId || defaults.APP_VERSION_ID;
    this.host = props.host || defaults.HOST;
    this.port = props.port || defaults.PORT;
    this.accessKeyId = props.accessKeyId;
    this.secretAccessKey = props.secretAccessKey;
    this.sellerId = props.sellerId;

    _.map(resources, (actions, resource) => {
      this[resource] = {};
      this.buildResource(resource, actions);
    });
  }

  headers(data) {
    return {
      Host: this.host,
      'User-Agent': `${this.appId}/${this.appVersionId} (Language=JavaScript)`,
      'Content-Type': /^<\?xml/.test(data.feedContent) ?
        'text/xml; charset=iso-8859-1' :
        'application/x-www-form-urlencoded; charset=utf-8',
      'Content-MD5': (data.feedContent)
        ? crypto.createHash('md5').update(data.feedContent).digest('base64')
        : null
    };
  }

  query(data) {
    const query = _.defaultsDeep({
      Timestamp: data.query.Timestamp || (new Date()).toISOString(),
      AWSAccessKeyId: data.query.AWSAccessKeyId || this.accessKeyId,
      SellerId: data.query.SellerId || this.sellerId,
      SignatureMethod: 'HmacSHA256',
      SignatureVersion: '2'
    }, data.query);

    return this.sign(data.path, query);
  }

  sign(path, query) {
    const sorted = _.reduce(_.keys(query).sort(), (m, k) => {
      m[k] = query[k];
      return m;
    }, {});

    const stringToSign = ['POST', this.host, path, qs.stringify(sorted)]
      .join('\n')
      .replace(/'/g, '%27')
      .replace(/\*/g, '%2A')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29');

    return _.assign({}, query, {
      Signature: crypto.createHmac('sha256', this.secretAccessKey)
        .update(stringToSign, 'utf8')
        .digest('base64')
    });
  }

  async request(data) {
    const query = this.query(data);
    const headers = this.headers(data);

    const options = {
      baseURL: `https://${this.host}:${this.port}`,
      url: `${data.path}?${qs.stringify(query)}`,
      method: 'post',
      headers,
      data: data.feedContent || null,
      transformResponse: [(body) => (parser.toJson(body, { object: true }))]
    };

    try {
      const response = await axios(options);
      // console.log(inspect(response, { colors: true, depth: 5 }));
      return response.data;
    } catch (error) {
      // console.error(inspect(error.response, { colors: true, depth: 5 }));
      return error.response.data;
    }
  }

  buildResource(resource, actions) {
    _.mapKeys(actions, (actionProps, actionName) => {
      const action = new Resource({
        path: actionProps.path,
        action: actionProps.action,
        version: actionProps.version,
        client: this
      });

      _.map(actionProps.params, (paramValue, paramName) => {
        action.param({ name: paramName, value: paramValue });
      });

      this[resource][actionName] = action;
    });
  }
}
