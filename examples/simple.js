import Yep from './'

Ko.Object({
  required: ['name'],
  properties: {
    name: [
      Ko.String,
      Ko.Url
    ]


  }
})


Yep.addAlias('curtomValidator', function () {
  return {
    valid: true,
    errors: []
  }
})

Yep.Object({
  required: ['name', 'surname']
  properties: {
    name: 'string',
    name: 'customValidator',
    surname: 'email'
  }
})

Yep.
