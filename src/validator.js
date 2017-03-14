/* @flow */

import {MapObj, fromArray} from './map'
import {ValidatorResult} from './result'
import {isArray, shallowCopy, hop} from './utils'
import v from './builtin'
import aliases from './aliases'

const keys = Object.keys

/**
 * Get validation error message
 * @param  {string} property
 * @returns string
 */
function getError(property: string): string {
  return [
    'Schema validation error,',
    'property "' + String(property) + '" is invalid'
  ].join(' ')
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

  _validateSingleProperty(key: string, value: any, validator: any): void {
    if (v.String(validator)) {
      if (!hop(aliases,  validator)) {
        throw new Error('Can not find alias ' + validator)
      } else if (!aliases[validator](value)) {
        this._result.addError(getError(key))
      }
    } else {
      if (!validator(value)) {
        this._result.addError(getError(key))
      }
    }
  }

  _getRequiredProps(): void {
    if (this.required.size()) {
      keys(this.required._items)
        .filter(key => this.required.get(key))
        .forEach((key) => {
          this._result.addError('Missing required property "' + key + '"')
        })
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

      if (this.required.get(key)) {
        this.required.unset(key)
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

    this._getRequiredProps()

    return this._result
  }
}

