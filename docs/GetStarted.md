### Basic usage example

```js
  import {validate} from '@gljs/schema-validator'

  interface ValidatorResult {
    valid: boolean
    errors: Array<string>
  }

  const Schema = {
    required: ['name', 'surname']
    name: 'string',
    surname: 'string',
    age: 'number'
  }

  const myObject = {
    name: 'Oleh',
    surname: 'Kuchuk'
  }

  const result: ValidatorResult = validate(Schema, myObject)

```

 
 ### Core concepts

Main concepts of library are `lightweight core` and `expandability`.
All validations based on single structure called `validator`.

In simple use case it is just a `function`,
that takes property value and returns `boolean` if property pass validation rules.

Here is validator with `Flow` type annotations:

```js
  /* @flow */
  function isURL(value: any): boolean {
    return /^http:\/\//.test(value)
  }

  // You can use with your schema like
  const Schema = {
    name: isURL
  }
```

More complex validators may accept some `params` to be efficient, you can make it by using
the power of JavaScript closures.

```js
  /* @flow */
  function isGreaterThan(param: number): boolean {
    return function (value: any): boolean {
      return value.length > param
    }
  }

  // You can use with your schema like
  const Schema = {
    someProperty: isGreaterThan(2)
  }
```

### Passing array of validators

Sometime you may want to pass list of validators for more complex rules

Here is example how we combine multiple validators

```js
  /* @flow */
  const Schema = {
    required: ['value']
    value: ['string', isURL, isGreaterThan(10)]
  }

  const myObject = {
    vvalue: 'http://www.globallogic.com'
  }

  const result: ValidatorResult = validate(Schema, myObject)

```

## API

To be defined
