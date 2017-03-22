import {PropTypes, validate} from '../out'

describe('Validation', () => {
  it('func should be defined', () => {
    expect(validate).toBeDefined()
  })

  // TODO add more convenient test cases
  it('should properly validate object schema', () => {
    expect(validate({
      required: ['babel', 'name'],
      properties: {
        name: PropTypes.string,
        value: PropTypes.arrayOf(PropTypes.number)
      }
    }, {
      name: 'test',
      value: ['test', 20]
    }).length).toBeGreaterThanOrEqual(1)
  })
})
