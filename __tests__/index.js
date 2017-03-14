import {validate} from '../'

describe('Validation', () => {
  it('func should be defined', () => {
    expect(validate).toBeDefined()
  })

  // TODO add more convenient test cases
  it('should properly validate object schema', () => {
    const Schema = {
      required:  ['babel', 'name'],
      properties: {
        name: 'string',
        value: ['string', function (value) {
          return value.length > 3
        }]
      }
    }

    const target = {
      babel: 'cool',
      name: 'str',
      value: 'longStr'
    }

    expect(validate(Schema, target).errors.length).toEqual(0)
  })

  it('should properly pass errors', () => {
    const Schema = {
      required: ['babel'],
      name: 'number'
    }

    const target = {
      name: 'str'
    }

    expect(validate(Schema, target).errors.length).toBeGreaterThanOrEqual(1)
  })
})
