/* @flow */

import {MapObj, fromArray} from './map'
import {ValidatorResult} from './result'
import {isArray, shallowCopy, hop} from './utils'
import v from './builtin'
import aliases from './aliases'

const keys = Object.keys

class ValidationError extends Error {
  type: string
  constructor(property: string) {
    const msg = [
      'Schema validation error,',
      'property "' + String(property) + '" is invalid'
    ].join(' ')

    super(msg)
    this.type = 'ValidationError'
  }
}

/**
 * Base validator class object
 * @class BaseValidator
 */
export class BaseValidator {
  properties: Object
  required: MapObj
  _result: ValidatorResult

  /**
   * Create new instance of BaseValidator
   * @param  {Object} schema
   * @param  {boolean} shalowErrors?
   */
  constructor(schema: Object, shalowErrors?: boolean) {
    const copy = shallowCopy(schema)
    this.required = fromArray(copy.required || [])
    this.properties = copy.properties || {}
    this._result = new ValidatorResult()
  }

  _validateSingleProperty(key: string, value: any, validator: any) {
    if (v.String(validator)) {
      if (!hop(aliases,  validator)) {
        throw new Error('Can not find alias ' + validator)
      } else if (!aliases[validator](value)) {
        this._result.addError((new ValidationError(key)).message)
      }
    } else {
      if (!validator(value)) {
        this._result.addError((new ValidationError(key)).message)
      }
    }
  }

  /**
   * Validate object by schema
   * @param  {Object} obj
   * @returns ValidatorResult
   */
  validate(obj: Object): ValidatorResult {
    keys(obj).forEach((key) => {
      const value = obj[key]

      console.log('required', this.required)
      if (this.required.get(key)) {
        //this.required.unset(key)
      }

      const validators = this.properties[key]

      if (!validators) {
        return
      }

      if (v.Array(validators)) {
        validators.forEach((item) => {
          this._validateSingleProperty(key, value, item)
        })
      } else {
        this._validateSingleProperty(key, value, validators)
      }
    })

    return this._result
  }
}

