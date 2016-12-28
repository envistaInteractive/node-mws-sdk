import _ from 'lodash';

export const generalTaxCodes = ['A_GEN_NOTAX', 'A_GEN_TAX'];

export const booksTaxCodes = [];

export const apparelTaxCodes = [];

export const sportingGoodsTaxCodes = [];

export const foodTaxCodes = [];

export const schoolSuppliesTaxCodes = [];

export const computersTaxCodes = [];

export const warrantiesTaxCodes = [];

export const servicesTaxCodes = [];

export const electronicGoodsTaxCodes = [];

export const healthBeautyTaxCodes = [];

export const infantBabySuppliesTaxCodes = [];

export const allTaxCodes = _.concat(
  generalTaxCodes,
  booksTaxCodes,
  apparelTaxCodes,
  computersTaxCodes,
  electronicGoodsTaxCodes,
  foodTaxCodes,
  healthBeautyTaxCodes,
  infantBabySuppliesTaxCodes,
  schoolSuppliesTaxCodes,
  servicesTaxCodes,
  sportingGoodsTaxCodes,
  warrantiesTaxCodes
);
