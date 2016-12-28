import { expect } from 'chai';
import { name, version } from '../package.json';
import { Envelope } from '../lib/models/envelope';
import { SingleProduct, MultipleProducts } from './fixtures';

describe(`${name}:${version} -------- ENVELOPE`, () => {
  const options = {
    MessageBody: SingleProduct,
    OperationType: 'Update',
    MessageType: 'Product'
  };

  it('should generate a an envelope.', () => {
    const envelope = new Envelope();

    expect(envelope).to.be.an.instanceof(Envelope);
    expect(envelope.xml()).to.be.an('string');
  });

  it('should generate a valid xml', () => {
    const envelope = new Envelope();
    const xml = envelope.xml(options);

    expect(xml).to.match(/<PurgeAndReplace>false<\/PurgeAndReplace>/);
    expect(xml).to.match(/<PurgeAndReplace>false<\/PurgeAndReplace>/);
  });

  it('should generate and validate a product message.', () => {
    const envelope = new Envelope();
    const xml = envelope.xml(options);

    expect(xml).to.match(/<SKU>56789<\/SKU>/);
    expect(xml).to.match(/<MessageID>1<\/MessageID>/);
  });

  it('should generate a consecutive message id when re-using the same envelope.', () => {
    const envelope = new Envelope();

    expect(envelope.xml(options)).to.match(/<MessageID>1<\/MessageID>/);
    expect(envelope.xml(options)).to.match(/<MessageID>2<\/MessageID>/);
  });

  it('should generate a valid xml for multiples messages.', () => {
    const envelope = new Envelope();
    const xml = envelope.xml({
      MessageType: 'Product',
      MessageBody: MultipleProducts,
      OperationType: 'Update'
    });

    expect(xml).to.match(/<Message><MessageID>1<\/MessageID>/);
    expect(xml).to.match(/<Message><MessageID>2<\/MessageID>/);
  });
});
