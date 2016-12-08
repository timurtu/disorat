'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by timur on 11/14/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Navbar = function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar() {
    _classCallCheck(this, Navbar);

    return _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).apply(this, arguments));
  }

  _createClass(Navbar, [{
    key: 'render',
    value: function render() {

      return _react2.default.createElement(
        'nav',
        null,
        _react2.default.createElement(
          'div',
          { style: {
              width: '100%',
              height: '4em',
              position: 'fixed',
              zIndex: 3,
              top: '0',
              left: '0',
              background: 'rgba(0,0,0,0.82)',
              opacity: '.9'
            } },
          _react2.default.createElement(
            'nav',
            { className: 'ui inverted secondary pointing menu' },
            _react2.default.createElement(
              _reactRouter.Link,
              { to: '/feed', className: 'item', activeClassName: 'active' },
              'Feed'
            ),
            _react2.default.createElement(
              'div',
              { className: 'right menu' },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: '/create', className: 'ui item', activeClassName: 'active' },
                'Create'
              )
            )
          )
        )
      );
    }
  }]);

  return Navbar;
}(_react2.default.Component);

exports.default = Navbar;