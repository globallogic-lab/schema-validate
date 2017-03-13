"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.fromArray = fromArray;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var hop = {}.hasOwnProperty;

/**
 * Custom key value storage object
 * @type Map
 */

var MapObj = exports.MapObj = function () {
  function MapObj() {
    _classCallCheck(this, MapObj);

    if (!(this instanceof MapObj)) {
      return new MapObj();
    }

    this._items = {};
    this._size = 0;
  }

  /**
   * Get size of map object
   * @returns number
   */


  _createClass(MapObj, [{
    key: "size",
    value: function size() {
      return this._size;
    }

    /**
     * Get certain key from map object
     * @param  {string} key
     * @returns any
     */

  }, {
    key: "get",
    value: function get(key) {
      console.log(this._items);
      if (hop(this._items, key)) {
        return this._items[key];
      }
    }

    /**
     * Set new value
     * @param  {string} key
     * @param  {any} value
     * @returns MapObj
     */

  }, {
    key: "set",
    value: function set(key, value) {
      this._items[key] = value;
      this._size += 1;
      return this;
    }

    /**
     * Unset value
     * @param  {string} key
     * @returns MapObj
     */

  }, {
    key: "unset",
    value: function unset(key) {
      // delete is expensive operation
      // so instead we mark property as undefined value
      // it makes it not serializible by JSON.stringify
      this._items[key] = undefined;

      if (this._size >= 1) {
        this._size -= 1;
      }
      return this;
    }
  }]);

  return MapObj;
}();

/**
 * Create map object from array
 * @param  {Array<string>} list
 * @returns MapObj
 */


function fromArray(list) {
  var map = new MapObj();
  for (var i = 0; i < list.length; i++) {
    map.set(list[i], true);
  }
  return map;
}