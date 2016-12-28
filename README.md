# node-mws-sdk

[![Travis](https://img.shields.io/travis/envistaInteractive/node-mws-sdk.svg?style=flat-square)](https://travis-ci.org/envistaInteractive/node-mws-sdk)
[![codecov coverage](https://img.shields.io/codecov/c/github/envistaInteractive/node-mws-sdk.svg?style=flat-square)](https://codecov.io/github/envistaInteractive/node-mws-sdk)
[![version](https://img.shields.io/npm/v/@enspire/node-mws-sdk.svg?style=flat-square)](http://npm.im/@enspire/node-mws-sdk)
[![downloads](https://img.shields.io/npm/dm/@enspire/node-mws-sdk.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@enspire/node-mws-sdk&from=2015-08-01)
[![MIT License](https://img.shields.io/npm/l/@enspire/node-mws-sdk.svg?style=flat-square)](http://opensource.org/licenses/MIT)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)

## Installation

```javascript
// usign npm
npm install @enspire/node-mws-sdk

// usign yarn
yarn add @enspire/node-mws-sdk
```

## Usage

```javascript
// ES6/7
import MWSClient from '@enspire/node-mws-sdk';

// ES5
const MWSClient = require('@enspire/node-mws-sdk');

const client = new MWSClient({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  sellerId: process.env.SELLERID
});

client.feeds // access all feeds methods.
client.request() // to make an open request.
```

### Quick example.
```javascript
import MWSClient from '@enspire/node-mws-sdk';

// We recommend using environment variables or equivalent security measure
// for your credentials. DO NOT hard code this for your own safety.
const client = new MWSClient({
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  sellerId: process.env.SELLERID
});

// I know I'm using ES6/7 sugar :D but you got the idea ;).
const response = await client.feeds.submitFeed.exec({
  feedContent: {
    MessageType: 'Product',
    MessageBody: [{
      Product: {
        SKU: 56789,
        StandardProductID: { Type: 'ASIN', Value: 'B0EXAMPLEG' },
        ProductTaxCode: 'A_GEN_NOTAX',
        DescriptionData: {
          Title: 'Example Product Title',
          Brand: 'Example Product Brand',
          Description: 'This is an example product description.',
          BulletPoint: [
            'Example Bullet Point 1',
            'Example Bullet Point 2'
          ],
          MSRP: [ { _attr: { currency: 'USD' } }, 25.19 ],
          Manufacturer: 'Example Product Manufacture',
          ItemType: 'example-item-type'
        },
        ProductData: {
          Health: {
            ProductType: {
              HealthMisc: {
                Ingredients: 'Example Ingredients',
                Directions: 'Example Directions'
              }
            }
          }
        }
      }
    }],
    OperationType: 'Update'
  }
});
```

## Contribute

Working on the contribution and styles guides for now please try to do it as clean as posible.

- Create an issue first.
- Lets talk about it before submit any code.
- Once we agree on a proposal solution then fork the project.
- Try to get 100% coverage (it would help a lot).
- The do a PR to master.

Note: ***remember keep your master up to date.***
