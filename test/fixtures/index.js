export const SingleProduct = [
  {
    Product: {
      SKU: 56789,
      StandardProductID: {
        Type: 'ASIN',
        Value: 'B0EXAMPLEG'
      },
      ProductTaxCode: 'A_GEN_NOTAX',
      DescriptionData: {
        Title: 'Example Product Title',
        Brand: 'Example Product Brand',
        Description: 'This is an example product description.',
        BulletPoint: [
          'Example Bullet Point 1',
          'Example Bullet Point 2'
        ],
        MSRP: [
          { _attr: { currency: 'USD' } },
          25.19
        ],
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
  }
];

export const MultipleProducts = [
  {
    Product: {
      SKU: 56789,
      StandardProductID: {
        Type: 'ASIN',
        Value: 'B0EXAMPLEG'
      },
      ProductTaxCode: 'A_GEN_NOTAX',
      DescriptionData: {
        Title: 'Example Product Title',
        Brand: 'Example Product Brand',
        Description: 'This is an example product description.',
        BulletPoint: [
          'Example Bullet Point 1',
          'Example Bullet Point 2'
        ],
        MSRP: [
          { _attr: { currency: 'USD' } },
          25.19
        ],
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
  },
  {
    Product: {
      SKU: 98765,
      StandardProductID: {
        Type: 'ASIN',
        Value: 'A0EXAMPLEH'
      },
      ProductTaxCode: 'A_GEN_NOTAX',
      DescriptionData: {
        Title: 'Example Product Title 2',
        Brand: 'Example Product Brand 2',
        Description: 'This is an example product description.',
        BulletPoint: [
          'Example Bullet Point 1',
          'Example Bullet Point 2'
        ],
        MSRP: [
          { _attr: { currency: 'USD' } },
          50.19
        ],
        Manufacturer: 'Example Product Manufacture 2',
        ItemType: 'example-item-type-2'
      },
      ProductData: {
        Health: {
          ProductType: {
            HealthMisc: {
              Ingredients: 'Example Ingredients 2',
              Directions: 'Example Directions 2'
            }
          }
        }
      }
    }
  }
];
