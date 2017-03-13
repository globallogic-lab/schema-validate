/* @flow */

const hop = ({}).hasOwnProperty

/**
 * Custom key value storage object
 * @type Map
 */
export class MapObj {
  _items: Object
  _size: number

  constructor() {
    if (!(this instanceof MapObj)) {
      return new MapObj()
    }

    this._items = {}
    this._size = 0
  }

  /**
   * Get size of map object
   * @returns number
   */
  size(): number {
    return this._size
  }

  /**
   * Get certain key from map object
   * @param  {string} key
   * @returns any
   */
  get(key: string): any {
    console.log(this._items)
    if (hop(this._items, key)) {
      return this._items[key]
    }
  }

  /**
   * Set new value
   * @param  {string} key
   * @param  {any} value
   * @returns MapObj
   */
  set(key: string, value: any): MapObj {
    this._items[key] = value
    this._size += 1
    return this
  }

  /**
   * Unset value
   * @param  {string} key
   * @returns MapObj
   */
  unset(key: string): MapObj {
    // delete is expensive operation
    // so instead we mark property as undefined value
    // it makes it not serializible by JSON.stringify
    this._items[key] = undefined

    if (this._size >= 1) {
      this._size -= 1
    }
    return this
  }
}

/**
 * Create map object from array
 * @param  {Array<string>} list
 * @returns MapObj
 */
export function fromArray(list: Array<string>): MapObj {
  const map = new MapObj()
  for (let i = 0; i < list.length; i++) {
    map.set(list[i], true)
  }
  return map
}
