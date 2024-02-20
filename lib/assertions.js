// @ts-check
'use strict';

/**
 * @template T
 * @param {T} type The type constructor to check against.
 * @param {*} value The value to check.
 * @returns {value is T} Whether the value is of the given type.
 */
const is = (type, value) => ![undefined, null].includes(value) && value.constructor === type;

/**
 * @param {*} value
 * @returns {value is string}
 */
const isValidString = (value) => is(String, value);

module.exports = { isValidString };
