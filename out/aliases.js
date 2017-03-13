'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _builtin = require('./builtin');

var _builtin2 = _interopRequireDefault(_builtin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var aliases = {};

aliases['string'] = _builtin2.default.String;
aliases['number'] = _builtin2.default.Number;
aliases['object'] = _builtin2.default.Object;
aliases['array'] = _builtin2.default.Array;
aliases['nullable'] = _builtin2.default.Nullable;

exports.default = aliases;