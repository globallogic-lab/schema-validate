'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.hop = hop;
exports.isObject = isObject;
exports.shallowCopy = shallowCopy;


/**
 * Helper for checking if object has own property
 * @param  {Object} value
 * @param  {string} key
 * @returns boolean
 */
function hop(value, key) {
  return {}.hasOwnProperty.call(value, key) && Boolean(value[key]);
}

/**
 * Helper for checking object values
 * @param  {any} value
 * @returns boolean
 */
function isObject(value) {
  return {}.toString.call(value) == '[object Object]' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

/**
 * Helper for checking array values
 * @param  {any} value
 * @returns boolean
 */
function _isArray(value) {
  return {}.toString.call(value) == '[object Array]' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
}

var isArray = exports.isArray = Array.isArray || _isArray;

/**
 * Shallow copy object values
 * For this realization function values
 * are passed by ref so be aware
 *
 * @param  {any} value
 * @returns any
 */
function shallowCopy(value) {
  if (isArray(value)) {
    return value.slice();
  }

  if (isObject(value)) {
    var copy = {};
    for (var key in value) {
      if (hop(value, key)) {
        if (isObject(value[key]) || isArray(value[key])) {
          copy[key] = shallowCopy(value[key]);
        } else {
          copy[key] = value[key];
        }
      }
    }

    return copy;
  }

  return value;
}