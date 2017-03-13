'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ValidatorResult = exports.ValidatorResult = function () {
  function ValidatorResult() {
    _classCallCheck(this, ValidatorResult);

    this.errors = [];
  }

  /**
   * Add new error object to collection
   * @param  {Error} error
   * @returns void
   */


  _createClass(ValidatorResult, [{
    key: 'addError',
    value: function addError(error) {
      this.errors.push(error);
    }

    /**
     * Print collected errors to console
     * @returns void
     */

  }, {
    key: 'printErrors',
    value: function printErrors() {
      console.log(this.errors.reduce(function (acc, err) {
        return acc.concat(err + '\n');
      }, ''));
    }
  }]);

  return ValidatorResult;
}();