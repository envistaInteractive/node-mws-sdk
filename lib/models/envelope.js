import _ from 'lodash';
import xml from 'xml';
import { inspect } from 'util';
import {
  removeDuplicates,
  stripUndefined,
  ensureArrays,
  stripEmpty
} from '../utils';

// const createXML = _.flowRight(xml, removeDuplicates, ensureArrays, stripEmpty, stripUndefined);
const normalize = _.flowRight(removeDuplicates, ensureArrays, stripEmpty, stripUndefined);

export class Envelope {
  constructor() {
    this.messageId = 0;
  }

  generateMessageId() {
    return ++this.messageId;
  }

  xml({
    PurgeAndReplace = 'false',
    MerchantIdentifier,
    MessageType,
    OperationType,
    MessageBody
  } = {}) {
    const Messages = _.map(MessageBody, (Message) => ({
      Message: [
        { MessageID: this.generateMessageId() },
        { OperationType },
        normalize(Message)
      ]
    }));

    // console.log('MESSAGE_NORMALIZED', inspect(Messages, { colors: true, depth: 5 }));

    const envelopeBody = xml({
      AmazonEnvelope: [
        {
          _attr: {
            'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
            'xsi:noNamespaceSchemaLocation': 'amzn-envelope.xsd'
          }
        },
        { Header: [{ DocumentVersion: 1.01 }, { MerchantIdentifier }] },
        { MessageType },
        { PurgeAndReplace: (PurgeAndReplace === 'true' || PurgeAndReplace === true)
            ? 'true' : 'false' }
      ].concat(Messages)
    });

    // console.log('ENVELOPE_BODY', inspect(envelopeBody, { colors: true, depth: 5 }));
    return `<?xml version="1.0" encoding="iso-8859-1"?>${envelopeBody}`;
  }
}
