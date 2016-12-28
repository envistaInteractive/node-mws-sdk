import Joi from 'joi';
import { allTaxCodes, conditionTypes } from './constants';

const SKU = Joi.string().alphanum().min(1).max(40).required();
const StandardProductId = Joi.object().keys({
  value: Joi.string().alphanum().min(10).max(13).required(),
  type: Joi.string().valid(['ISBN', 'ASIN', 'UPC', 'EAN', 'GTIN']).required()
});
const GtinExemptionReason = Joi.string().valid(['bundle', 'part']);
const RelatedProductId = null; // No information found.
const ProductTaxCode = Joi.string().valid(allTaxCodes).default(allTaxCodes[0]);
const LaunchDate = Joi.date();
const DiscountinueDate = Joi.date();
const ReleaseDate = Joi.date();
const ExternalProductUrl = Joi.string().uri();
const OffAmazonChannel = Joi.string().valid(['advertise', 'exclude']);
const OnAmazonChannel = Joi.string().valid(['sell', 'advertise', 'exclude']);
const Condition = Joi.string().valid(conditionTypes);
const Rebate = null; // No information found.
const ItemPackageQuantity = Joi.number().positive().integer()
  // first field with description in Amazon so far.
  .description(`Indicate number of units included in the item you offering for sale,
                such that each unit is packaged for individual sale.`);
const NumberOfItems = Joi.number().positive().integer()
  // second field with description in Amazon so far.
  .description(`Indicate the number of discrete items included in the item you are
                offering for sale, such that item is not packaged for individual sale.
                For example, if you are selling a case of 10 packages of socks,
                and each package contains 3 pairs of socks, the case would have
                ItemPackageQuantity = 10 and NumberOfItems = 30`);
const LiquidVolume = null;

export class Product {}
