'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function Loading() {
  return _react2.default.createElement(
    'div',
    { style: { height: '20em' }, className: 'ui active dimmer' },
    _react2.default.createElement(
      'div',
      { className: 'ui big text loader' },
      'Loading'
    )
  );
}; /**
    * Created by timur on 12/7/16.
    */

exports.default = Loading;