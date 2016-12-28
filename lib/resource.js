import _ from 'lodash';
import { Envelope } from './models';

export default class Resource {
  constructor({ path, version, action, client }) {
    this.path = path;
    this.query = {
      Action: action,
      Version: version,
    };
    this.client = client;
  }

  param({ name, value }) { this.query[name] = value; }

  exec(data) {
    if (data.feedContent) {
      const envelope = new Envelope();
      data.feedContent = envelope.xml(data.feedContent);
    }

    return this.client.request(_.defaultsDeep(data, { path: this.path, query: this.query }));
  }
}
