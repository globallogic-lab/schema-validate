const Schema = require('../out').Schema
const _ = require('../out/builtin')

import {linkSchema} from 'ura'

describe('Schema validator', () => {
  it('Schema should be defined', () => {
    expect(Schema).toBeDefined()
  })

  it('Validation should properly work', () => {
    const BaseSchema = new Schema({
      required: ['test'],
      data: {
        test: x.async([
          function * () {
            yield
          }
        ])


      }
    })


    Uru.defineAlias('Array<string>', function () {
      return vArray(function (elem) {
        return vString(elem)
      })
    })


    const TestSchema = new Schema({
      data: {
        obj: function () {
          // long complex validator
        }
        data: like('obj'),
        nested: linkSchema(new Schema({

        }))
      }
    })

    TestSchema.asyncValidate({
      obj: {test: 'test'}
    }).then(function (result) {

    }.catch(function (error) {
      console.log(errors)
    })

    console.log(result)
  })
})
