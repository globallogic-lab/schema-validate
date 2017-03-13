/* @flow */

import validators from './builtin'

const aliases = {}

aliases['string'] = validators.String
aliases['number'] = validators.Number
aliases['object'] = validators.Object
aliases['array'] = validators.Array
aliases['nullable'] = validators.Nullable

export default aliases
