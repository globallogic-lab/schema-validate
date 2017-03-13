import {validate} from '../'

describe('Validation', () => {
  it('func should be defined', () => {
    expect(validate).toBeDefined()
  })

  it('expect', () => {
    const obj = {
      required:  [],
      properties: {
        name: 'string',
        value: ['string', function (value) {
          return value.length > 3
        }]
      }
    }

    const result = validate(obj, {
      name: 'sdfdsf',
      value: 'as'
    })

    result.printErrors()
  })
})
