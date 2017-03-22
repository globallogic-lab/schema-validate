/* @flow */

type Func = (value: any) => Error|void|Function

type result = Error | void

type Map<T> = {
  [index: string]: T
}

type TypeSchema = {
  required: Array<string>,
  properties: Map<any>
}

function hop(value: Object, key: string): boolean {
  return ({}).hasOwnProperty.call(value, key)
}

function isObject(value: any): boolean {
  return (({}).toString.call(value) == '[object Object]' && typeof value == 'object')
}

function shallowCopy(value: any): any {
  if (Array.isArray(value)) return value.slice()

  if (isObject(value)) {
    const copy = {}
    for (var key in value) {
      if (hop(value, key)) {
        if (isObject(value[key]) || Array.isArray(value[key])) {
          copy[key] = shallowCopy(value[key])
        } else {
          copy[key] = value[key]
        }
      }
    }

    return copy
  }

  return value
}

class PropError extends Error {
  constructor(prop: string, type: string) {
    super(`validation error -> property ${prop} should be a ${type}`)
  }
}

function isObject(value: any): boolean {
  return ( ({}).toString.call(value) == '[object Object]' && typeof value == 'object' )
}

function getValidator(val) {
  let validator
  if (typeof val == 'string') {
    validator = PropTypes[val]
    if (!validator) {
      throw new Error('Can not find suitable validator')
    }
  } else {
    validator = val
  }

  return validator
}

export const PropTypes: Map<Func> = {
  string(key: string, value: any): Error|void {
    if (typeof value != 'string' || !value.length) {
      return new Error(`property ${key} should be a string`)
    }
  },

  array(key: string, value: any): Error|void {
    if (!Array.isArray(value)) {
      return new PropError(key, 'string')
    }
  },

  number(key: string, value: any): Error|void {
    if (typeof value != 'number') {
      return new PropError(key, 'number')
    }
  },

  object(key: string, value: any): Error|void {
    if (!isObject(value)) {
      return new PropError(key, 'object')
    }
  },

  nullable(key: string, value: any): Error|void {
    if (
      value !== null &&
      !isNaN(value) &&
      typeof value != 'undefined'
    ) {
      return new PropError(key, 'nullable')
    }
  },

  arrayOf(type: string|Func) {
    const validator = getValidator(type)
    return function (key: string, value: any): Error|void {
      let err

      err = PropTypes.array(key, value)
      if (err) return err

      for (var i = 0; i < value.length; i++) {
        err = validator(`${key}[${i}]`, value[i])
        if (err) return err
      }
    }
  }
}

function toMap(list: Array<string>): Object {
  const map = {}
  for (let i = 0; i < list.length; i++) map[list[i]] = true
  return map
}


export function validate(propTypes: TypeSchema, value: any) {
  const errors = []
  const requiredProps = toMap(propTypes.required || [])
  for (var propName in propTypes.properties) {
    if (hop(propTypes.properties, propName)) {
      var validator = getValidator(propTypes.properties[propName])
      const propValue = value[propName]
      if (requiredProps[propName] && !propValue) {
        errors.push(new Error(`missing required property ${propName}`))
        continue
      }
      const error = validator(propName, value[propName])
      if (error) {
        errors.push(error)
      }
    }
  }
  return errors
}


