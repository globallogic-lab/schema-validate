/* @flow */

/**
 * Helper for checking if object has own property
 * @param  {Object} value
 * @param  {string} key
 * @returns boolean
 */
export function hop(value: Object, key: string): boolean {
  return ( ({}).hasOwnProperty.call(value, key) && Boolean(value[key]))
}

/**
 * Helper for checking object values
 * @param  {any} value
 * @returns boolean
 */
export function isObject(value: any): boolean {
  return (({}).toString.call(value) == '[object Object]' && typeof value == 'object')
}

/**
 * Helper for checking array values
 * @param  {any} value
 * @returns boolean
 */
function _isArray(value: any): boolean {
  return (({}).toString.call(value) == '[object Array]' && typeof value == 'object')
}

export const isArray = Array.isArray || _isArray

/**
 * Shallow copy object values
 * For this realization function values
 * are passed by ref so be aware
 *
 * @param  {any} value
 * @returns any
 */
export function shallowCopy(value: any): any {
  if (isArray(value)) {
    return value.slice()
  }

  if (isObject(value)) {
    const copy = {}
    for (var key in value) {
      if (hop(value, key)) {
        if (isObject(value[key]) || isArray(value[key])) {
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
