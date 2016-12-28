const FEEDS_VERSION = '2009-01-01';
const FEEDS_PATH = `/Feeds/${FEEDS_VERSION}`;

export default {
  submitFeed: {
    path: FEEDS_PATH,
    version: FEEDS_VERSION,
    action: 'SubmitFeed',
    params: {
      FeedType: '_POST_PRODUCT_DATA_',
      PurgeAndReplace: 'false'
    }
  }
};
