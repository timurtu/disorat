'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onError = undefined;

var _gutilColorLog = require('gutil-color-log');

var _gutilColorLog2 = _interopRequireDefault(_gutilColorLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onError = exports.onError = function onError(e) {
  return (0, _gutilColorLog2.default)('red', e);
}; /**
    * Created by timur on 11/11/16.
    */