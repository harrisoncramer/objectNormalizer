const util = require('util');
const { data, data2, data3, data4 } = require('./data');

/* Top level function required to provide rootQueryObject and denestedObjects
 * through closure to flatObjAndWrite and flattenArray.
 */
function normalize(input) {
  const rootQueryObject = {};
  const denestedObjects = [];

  /* If top level result is an array, denest every object in it.
   * If it's an object, start denesting immediately.
   */
  function flatten(input) {
    for (const key in input) {
      rootQueryObject[key] = `loql__${key}`;
      const value = input[key];
      if (Array.isArray(value)) {
        rootQueryObject[key] = flattenArray({ value, childKey: key });
      } else {
        flatObjAndWrite({ object: input[key], parentKey: key });
      }
    }
  }

  /*
   * Takes an object, and a parent key. Recursively goes through keys
   * in object, and writes all to denestedObjects array. If result at key is a
   * primitive, write to result. If object, set to result of recursive call.
   * If array, set to mapped value of flattenedArray.
   */
  function flatObjAndWrite({ object, parentKey }) {
    const result = {};
    for (const key in object) {
      const value = object[key];
      if (Array.isArray(value)) {
        let childKey = parentKey + '_' + key;
        result[key] = flattenArray({ value, childKey });
      } else if (typeof value === 'object' && value !== null) {
        let childKey = parentKey + '_' + key;
        result[key] = flatObjAndWrite({ object: value, parentKey: childKey });
      } else {
        result[key] = value;
      }
    }

    denestedObjects.push({ [parentKey]: result });
    return 'loql__' + parentKey;
  }

  /*
   * Takes an array, loops over every value in the array.
   * For every object, calls flattenObject, then returns the ref.
   * For every non-object, returns the value directly.
   */
  function flattenArray({ value, childKey }) {
    return value.map((subArrayVal) => {
      if (typeof subArrayVal === 'object' && subArrayVal !== null) {
        if (!subArrayVal.id) return subArrayVal;
        const uniqueKey = childKey + '_' + subArrayVal.id; // Add id...
        return flatObjAndWrite({
          object: subArrayVal,
          parentKey: uniqueKey,
        });
      }
      return subArrayVal;
    });
  }

  /* Invoke normalizeResult function
   * in order to build the results.
   */
  flatten(input);

  return { rootQueryObject, denestedObjects };
}

const res = normalize(data2.data);
console.log(util.inspect(res, { depth: null }));
