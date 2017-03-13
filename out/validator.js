'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseValidator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _map = require('./map');

var _result = require('./result');

var _utils = require('./utils');

var _builtin = require('./builtin');

var _builtin2 = _interopRequireDefault(_builtin);

var _aliases = require('./aliases');

var _aliases2 = _interopRequireDefault(_aliases);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var keys = Object.keys;

var ValidationError = function (_Error) {
  _inherits(ValidationError, _Error);

  function ValidationError(property) {
    _classCallCheck(this, ValidationError);

    var msg = ['Schema validation error,', 'property "' + String(property) + '" is invalid'].join(' ');

    var _this = _possibleConstructorReturn(this, (ValidationError.__proto__ || Object.getPrototypeOf(ValidationError)).call(this, msg));

    _this.type = 'ValidationError';
    return _this;
  }

  return ValidationError;
}(Error);

/**
 * Base validator class object
 * @class BaseValidator
 */


var BaseValidator = exports.BaseValidator = function () {

  /**
   * Create new instance of BaseValidator
   * @param  {Object} schema
   * @param  {boolean} shalowErrors?
   */
  function BaseValidator(schema, shalowErrors) {
    _classCallCheck(this, BaseValidator);

    var copy = (0, _utils.shallowCopy)(schema);
    this.required = (0, _map.fromArray)(copy.required || []);
    this.properties = copy.properties || {};
    this._result = new _result.ValidatorResult();
  }

  _createClass(BaseValidator, [{
    key: '_validateSingleProperty',
    value: function _validateSingleProperty(key, value, validator) {
      if (_builtin2.default.String(validator)) {
        if (!(0, _utils.hop)(_aliases2.default, validator)) {
          throw new Error('Can not find alias ' + validator);
        } else if (!_aliases2.default[validator](value)) {
          this._result.addError(new ValidationError(key).message);
        }
      } else {
        if (!validator(value)) {
          this._result.addError(new ValidationError(key).message);
        }
      }
    }

    /**
     * Validate object by schema
     * @param  {Object} obj
     * @returns ValidatorResult
     */

  }, {
    key: 'validate',
    value: function validate(obj) {
      var _this2 = this;

      keys(obj).forEach(function (key) {
        var value = obj[key];

        console.log('required', _this2.required);
        if (_this2.required.get(key)) {
          //this.required.unset(key)
        }

        var validators = _this2.properties[key];

        if (!validators) {
          return;
        }

        if (_builtin2.default.Array(validators)) {
          validators.forEach(function (item) {
            _this2._validateSingleProperty(key, value, item);
          });
        } else {
          _this2._validateSingleProperty(key, value, validators);
        }
      });

      return this._result;
    }
  }]);

  return BaseValidator;
}();