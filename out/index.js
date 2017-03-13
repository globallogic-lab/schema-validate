'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validate = validate;

var _validator = require('./validator');

var _result = require('./result');

function validate(schema, target) {
  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var validator = new _validator.BaseValidator(schema);
  return validator.validate(target);
}