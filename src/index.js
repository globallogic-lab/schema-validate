const arrify = require('arrify')
const Iterable = require('object-iterate')

const isobject =
  (value) =>
    ( typeof value === 'object' && ({}).toString.call(value) === '[object Object]' )

let Schema =
  function (params) {
    // make required props mutable
    this.required = arrify(params.required).slice()
    this.data = params.data
  }

var proto = Schema.prototype

proto.validate =
  function (obj) {

    const validatableProp =
      (property) =>
         property in this.data


    const requiredProp =
      (property) =>
        ( this.required.indexOf(property) > -1 )


    const removeItem =
      (list, item) =>
        list.splice(list.indexOf(item), 1)


    const validateProperty =
      (property, value) => {
        if ( requiredProp(property) )
          removeItem(this.required, property)

        let handler = this.data[property]

        if ( handler ) return handler(value)

        return true
      }


    if ( !isobject(obj) )
      throw new Error(`error while validating schema, value should be an object`)

    let results = []

    Iterable(obj)
      .each(
        (value, key, obj) => {
          results.push(validateProperty(key, value, obj))
        }
      )

    return ( ( results.every(res => res) ) && ( !this.required.length ) )
  }

module.exports = Schema
