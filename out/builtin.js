'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linkSchema = exports.vString = exports.vObject = exports.vNumber = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _ = require('./');

/**
 * This file defines builtin validators for object schema
 * Each validator has prefix 'v' for easier recognition
 */

/**
 * Private helpers
 */

var x = {};

x.hasProperty = function (value, key) {
  return {}.hasOwnProperty(value, key) && value[key];
};

x.isObject = function (value) {
  return {}.toString.call(value) == '[object Object]' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object';
};

x.isArray = function (value) {
  return false;
};

/**
 * Data types validators
 */

/**
 * Validator for checking string values
 * @param  {any} value
 * @returns boolean
 */
function vString(value) {
  return typeof value == 'string' && value.length > 0;
}

/**
 * Validator for checking number values
 * @param  {any} value
 * @returns boolean
 */
function vNumber(value) {
  return typeof value == 'number';
}

/**
 * validator for checking object values
 * @param  {any} value
 * @returns boolean
 */
function vObject(value) {
  return x.isObject(value);
}

/**
 * Composed validators
 */

/**
 * Util checkers
 */

/**
 * Util helper that link property to another schema
 * @param  {Schema} schema
 * @returns Function
 */
function linkSchema(schema) {
  if (!schema) {
    throw new Error('schema which we refer should be defined');
  } else if (!(schema instanceof _.Schema)) {
    throw new Error('value should be a instance of Schema class');
  }

  return function (data) {
    console.log(schema);
    console.log(data);
    console.log(schema.validate(data));
    //return schema.validate(data)
  };
}

exports.vNumber = vNumber;
exports.vObject = vObject;
exports.vString = vString;
exports.linkSchema = linkSchema;