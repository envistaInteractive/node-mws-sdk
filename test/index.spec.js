import { expect } from 'chai';
import MWS from '../lib';
import { name } from '../package.json';

describe(`${name}:module`, () => {
  it('should return an MWS client.', () => {
    const sdk = new MWS();
    expect(sdk).to.be.an.instanceof(MWS);
  });
});
