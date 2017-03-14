/* @flow */

import {BaseValidator} from './validator'
import * as _ from './utils'

/**
 * Validator for checking string values
 * @param  {any} value
 * @returns boolean
 */
function _string(value: any): boolean {
  return ( typeof value == 'string' && value.length > 0 )
}

/**
 * Validator for checking number values
 * @param  {any} value
 * @returns boolean
 */
function _number(value: any): boolean {
  return typeof value == 'number'
}

/**
 * validator for checking object values
 * @param  {any} value
 * @returns boolean
 */
function _object(value: any): boolean {
  return _.isObject(value)
}

/**
 * validator for checking array values
 * @param  {any} value
 * @returns boolean
 */
function _array(value: any): boolean {
  return _.isArray(value)
}

/**
 * Check if value is nullable
 * @param  {any} value
 * @returns boolean
 */
function _nullable(value: any): boolean {
  if (
    value === null ||
    isNaN(value) ||
    typeof value === 'undefined'
  ) return true

  return !Boolean(value)
}

export default {
  Number: _number,
  Object: _object,
  String: _string,
  Array: _array,
  Nullable: _nullable
}
