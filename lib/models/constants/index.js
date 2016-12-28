export * from './taxCodes';

// DateTime Formats
export const shortDateFormat = 'yyyy-mm-dd';
export const longDateFormat = `${shortDateFormat}Thh:mm`;
export const UZTDateFormat = `${longDateFormat}:ssZ`;
export const TimeZoneDateFormat = `${longDateFormat}:ss±hh:mm`;

// Condition Types
export const conditionTypes = [
  'New',
  'UsedLikeNew',
  'UsedVeryGood',
  'UsedGood',
  'UsedAcceptable',
  'CollectibleLikeNew',
  'CollectibleVeryGood',
  'CollectibleGood',
  'CollectibleAcceptable',
  'Refurbished',
  'Club'
];
