/* @flow */

import {BaseValidator} from './validator'
import {ValidatorResult} from './result'

export function validate(schema: Object, target: Object, params: Object = {}): ValidatorResult {
  const validator = new BaseValidator(schema)
  return validator.validate(target)
}

