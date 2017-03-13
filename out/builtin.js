'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validator = require('./validator');

var _utils = require('./utils');

var _ = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Validator for checking string values
 * @param  {any} value
 * @returns boolean
 */
function _string(value) {
  return typeof value == 'string' && value.length > 0;
}

/**
 * Validator for checking number values
 * @param  {any} value
 * @returns boolean
 */
function _number(value) {
  return typeof value == 'number';
}

/**
 * validator for checking object values
 * @param  {any} value
 * @returns boolean
 */
function _object(value) {
  return _.isObject(value);
}

/**
 * validator for checking array values
 * @param  {any} value
 * @returns boolean
 */
function _array(value) {
  return _.isArray(value);
}

/**
 * Check if value is nullable
 * @param  {any} value
 * @returns boolean
 */
function _nullable(value) {
  if (value === null || isNaN(value) || typeof value === 'undefined') return true;

  return !Boolean(value);
}

exports.default = {
  Number: _number,
  Object: _object,
  String: _string,
  Array: _array,
  Nullable: _nullable
};