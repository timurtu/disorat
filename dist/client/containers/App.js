'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Navbar = require('../components/Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Search = require('../components/Search');

var _Search2 = _interopRequireDefault(_Search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Navbar2.default, null),
    _react2.default.createElement(_Search2.default, { 'default': 'Search...' }),
    _react2.default.createElement(
      'div',
      { style: {
          marginTop: '3em',
          backgroundColor: '#000'
        }, className: 'ui inverted segment' },
      children
    )
  );
}; /**
    * Created by timur on 12/5/16.
    */

exports.default = App;