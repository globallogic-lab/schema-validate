/* @flow */

// Note this is lightweight but not full featured implementation of schema validation
// Most of features are disabled here

class Store {
  _items: Object
  _size: number
  static fromArray: (list: Array<string>) => Store

  constructor() {
    this._items = {}
    this._size = 0
  }

  size(): number {
    return this._size
  }

  get(key: string): any {
    if (({}).hasOwnProperty(this._items, key) && this._items[key]) {
      return this._items[key]
    }
  }

  set(key: string, value: any): Store {
    this._items[key] = value
    this._size += 1
    return this
  }

  unset(key: string): Store {
    // delete is expensive operation
    // so instead we mark property as nullable value
    this._items[key] = false

    if (this._size >= 1) {
      this._size -= 1
    }
    return this
  }
}

Store.fromArray = function (list: Array<string>): Store {
  const store = new Store()

  list.forEach(function (item) {
    store.set(item, true)
  })

  return store
}

export class Schema {
  data: Object
  required: Store
  _errors: Array<Error>
  _shallowErrors: boolean

  constructor(schema: Object, shalowErrors?: boolean) {
    this.required = Store.fromArray(schema.required || [])
    this.data = schema.data
    this._shallowErrors = shalowErrors || false
    this._errors = []
  }

  validate(obj: Object): any {
    Object.keys(obj).forEach((key) => {
      const value = obj[key]
      if (this.required.get(key)) {
        this.required.unset(key)
      }

      if (this.data[key]) {
        if (!this.data[key](value)) {
          const validationError = new Error(`
            Schema validation error,
            property: ${key} is invalid.
          `)

          if (this._shallowErrors) {
            this._errors.push(validationError)
          } else {
            throw validationError
          }
        }
      }
    })

    if (!this.required.size()) {
      return true
    } else {
      return false
    }
  }
}
