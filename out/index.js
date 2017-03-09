"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Note this is lightweight but not full featured implementation of schema validation
// Most of features are disabled here

var Store = function () {
  function Store() {
    _classCallCheck(this, Store);

    this._items = {};
    this._size = 0;
  }

  _createClass(Store, [{
    key: "size",
    value: function size() {
      return this._size;
    }
  }, {
    key: "get",
    value: function get(key) {
      if ({}.hasOwnProperty(this._items, key) && this._items[key]) {
        return this._items[key];
      }
    }
  }, {
    key: "set",
    value: function set(key, value) {
      this._items[key] = value;
      this._size += 1;
      return this;
    }
  }, {
    key: "unset",
    value: function unset(key) {
      // delete is expensive operation
      // so instead we mark property as nullable value
      this._items[key] = false;

      if (this._size >= 1) {
        this._size -= 1;
      }
      return this;
    }
  }]);

  return Store;
}();

Store.fromArray = function (list) {
  var store = new Store();

  list.forEach(function (item) {
    store.set(item, true);
  });

  return store;
};

var Schema = exports.Schema = function () {
  function Schema(schema, shalowErrors) {
    _classCallCheck(this, Schema);

    this.required = Store.fromArray(schema.required || []);
    this.data = schema.data;
    this._shallowErrors = shalowErrors || false;
    this._errors = [];
  }

  _createClass(Schema, [{
    key: "validate",
    value: function validate(obj) {
      var _this = this;

      Object.keys(obj).forEach(function (key) {
        var value = obj[key];
        if (_this.required.get(key)) {
          _this.required.unset(key);
        }

        if (_this.data[key]) {
          if (!_this.data[key](value)) {
            var validationError = new Error("\n            Schema validation error,\n            property: " + key + " is invalid.\n          ");

            if (_this._shallowErrors) {
              _this._errors.push(validationError);
            } else {
              throw validationError;
            }
          }
        }
      });

      if (!this.required.size()) {
        return true;
      } else {
        return false;
      }
    }
  }]);

  return Schema;
}();