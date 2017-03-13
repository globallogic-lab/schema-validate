import * as utils from '../out/utils'

// Utils test cases
describe('TestUtils', () => {

  //TODO add more tests
  describe('TestUtils.shallowCopy', () => {
    it('should be defined', () => {
      expect(utils.shallowCopy).toBeDefined()
    })

    it('should properly copy object', () => {
      const obj = {name: 'test', value: 1}
      const copy = utils.shallowCopy(obj)

      expect(copy.name).toEqual('test')
      expect(copy.value).toEqual(1)
    })

    it('should properly works with nested objects', () => {
      const nested = {
        value: {
          test: 'test'
        }
      }

      const copy = utils.shallowCopy(nested)

      expect(typeof copy.value).toEqual('object')
      expect(copy.value.test).toEqual('test')
    })

    it('should pass by value arrays', () => {
      const obj = {
        value: [1,2,3]
      }

      const copy = utils.shallowCopy(obj)
      obj.value[0] = 3

      expect(Array.isArray(copy.value)).toEqual(true)
      expect(copy.value[0]).toEqual(1)
    })

    it('should not save reference to origin', () => {
      const obj = {
        test: 'test',
        nested: {
          value: 'test'
        }
      }

      const copy = utils.shallowCopy(obj)
      obj.nested.value = 'changed'
      expect(copy.nested.value).toEqual('test')
    })
  })

  // TODO add more verbose tests
  describe('TestUtils.isArray', () => {
    it('should be defined', () => {
      expect(utils.isArray).toBeDefined()
    })

    it('should properly check value type', () => {
      expect(utils.isArray([1,2,3])).toEqual(true)
      expect(utils.isArray([])).toEqual(true)
      expect(utils.isArray({})).toEqual(false)
      expect(utils.isArray(true)).toEqual(false)
    })
  })

  // TODO add more verbose tests
  describe('TestUtils.isObject', () => {
    it('should be defined', () => {
      expect(utils.isObject).toBeDefined()
    })

    it('should properly check value type', () => {
      expect(utils.isObject({})).toEqual(true)
      expect(utils.isObject([])).toEqual(false)
      expect(utils.isObject({ toString: () => false })).toEqual(true)
      expect(utils.isObject(true)).toEqual(false)
    })
  })


  // TODO add more verbose tests
  describe('TestUtils.hop', () => {
    const obj = {
      value: 'test'
    }

    it('should be defined', () => {
      expect(utils.hop).toBeDefined()
    })

    it('should properly check own props', () => {
      expect(utils.hop(obj, 'value')).toEqual(true)
      expect(utils.hop(obj, 'getOwnPropertyNames')).toEqual(false)
    })
  })
})
