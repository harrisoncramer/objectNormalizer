const util = require('util');
const { data, data2, data3, data4 } = require('./data');

function normalizeResult(result) {
  const rootQueryObject = {};
  const denestedObjects = [];

  /* If top level result is an array, denest every object in it.
   * If it's an object, start denesting immediately.
   */
  for (key in result) {
    rootQueryObject[key] = `loql__${key}`;
    if (Array.isArray(result[key])) {
      for (val of result[key]) {
        flattenAndWrite({ data: val, parentKey: key });
      }
    } else {
      flattenAndWrite({ data: result[key], parentKey: key });
    }
  }

  /*
   * Takes an object, and a parent key. Recursively goes through keys
   * in object, and writes all to denestedObjects array. If result at key is a
   * primitive, write to result. If object, set to result of recursive call.
   * If array, set to mapped value of array.
   */
  function flattenAndWrite({ data, parentKey }) {
    const result = {};
    for (key in data) {
      const value = data[key];
      if (Array.isArray(value)) {
        let childKey = parentKey + '_' + key;
        result[key] = value.map((subArrayVal) => {
          if (typeof subArrayVal === 'object' && subArrayVal !== null) {
            if (!subArrayVal.id) return subArrayVal;
            const uniqueKey = childKey + '_' + subArrayVal.id; // Add id...
            return flattenAndWrite({ data: subArrayVal, parentKey: uniqueKey });
          }
          return subArrayVal;
        });
      } else if (typeof value === 'object' && value !== null) {
        let childKey = parentKey + '_' + key;
        result[key] = flattenAndWrite({ data: value, parentKey: childKey });
      } else {
        result[key] = value;
      }
    }

    denestedObjects.push({ [parentKey]: result });

    return 'loql__' + parentKey;
  }

  return { rootQueryObject, denestedObjects };
}

const res = normalizeResult(data3.data);
console.log(util.inspect(res, { depth: null }));
