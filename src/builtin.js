/* @flow */

import {Schema} from './'

/**
 * This file defines builtin validators for object schema
 * Each validator has prefix 'v' for easier recognition
 */

/**
 * Private helpers
 */

const x = {}

x.hasProperty = function (value: Object, key: string): boolean {
  return ( ({}).hasOwnProperty(value, key) && value[key] )
}

x.isObject = function (value: any): boolean {
  return ({}).toString.call(value) == '[object Object]' && typeof value == 'object'
}

x.isArray = function (value: any): boolean {
  return false
}

/**
 * Data types validators
 */

/**
 * Validator for checking string values
 * @param  {any} value
 * @returns boolean
 */
function vString(value: any): boolean {
  return ( typeof value == 'string' && value.length > 0 )
}

/**
 * Validator for checking number values
 * @param  {any} value
 * @returns boolean
 */
function vNumber(value: any): boolean {
  return typeof value == 'number'
}

/**
 * validator for checking object values
 * @param  {any} value
 * @returns boolean
 */
function vObject(value: any): boolean {
  return x.isObject(value)
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
function linkSchema(schema: Schema): Function {
  if (!schema) {
    throw new Error('schema which we refer should be defined')
  } else if (!(schema instanceof Schema)) {
    throw new Error('value should be a instance of Schema class')
  }

  return function (data: any): boolean {
    console.log(schema)
    console.log(data)
    console.log(schema.validate.call(schema, data))
    //return schema.validate(data)
  }
}

export {
  vNumber,
  vObject,
  vString,
  linkSchema
}
