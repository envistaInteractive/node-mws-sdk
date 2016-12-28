import _ from 'lodash';

function visitEvery(fn) {
  return function visit(obj) {
    if (_.isObject(obj) && !_.isArray(obj)) {
      return fn(visit, obj);
    }

    if (_.isArray(obj)) {
      return _.map(obj, visit);
    }

    return obj;
  };
}

function arrayify(val) {
  if (_.isString(val) || _.isNumber(val)) {
    return val;
  }

  if (_.isArray(val)) {
    return _.flatMap(val, arrayify);
  }

  return _.reduce(val, (memo, value, key) => _.concat(memo, { [key]: value }), []);
}

function isSimpleArray(val) {
  return _.isArray(val) && _.every(val, (item) => _.isString(item) || _.isNumber(item));
}

function slurpDuplicates(val) {
  if (!_.isArray(val)) {
    return val;
  }

  return _.flatMap(val, (item) => {
    if (_.keys(item).length !== 1) {
      return [item];
    }

    const k = _.keys(item)[0];

    if (!_.isArray(item[k])) {
      return [item];
    }

    if (_.every(item[k], (subitem) => subitem[k])) {
      return item[k];
    }

    return [item];
  });
}

export const removeDuplicates = visitEvery((visit, obj) =>
  _.mapValues(obj, (val, key) => visit(slurpDuplicates(val, key)))
);

export const ensureArrays = visitEvery((visit, obj) => _.mapValues(obj, (val, key) => {
  if (key === '_attr' || key === '_cdata' || !_.isObject(val)) {
    return val;
  }

  if (isSimpleArray(val)) {
    return _.reduce(val, (memo, item) => _.concat(memo, { [key]: item }), []);
  }

  return visit(arrayify(val));
}));

export const stripUndefined = visitEvery((visit, obj) => _.reduce(obj, (memo, val, key) => {
  if (val !== undefined) {
    memo[key] = visit(val);
  }

  return memo;
}, {}));

export const stripEmpty = visitEvery((visit, obj) => _.reduce(obj, (memo, val, key) => {
  if (!_.isObject(val) || !_.isEmpty(val)) {
    memo[key] = visit(val);
  }

  return memo;
}, {}));
