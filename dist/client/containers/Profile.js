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

var Profile = function (_React$Component) {
  _inherits(Profile, _React$Component);

  function Profile() {
    _classCallCheck(this, Profile);

    return _possibleConstructorReturn(this, (Profile.__proto__ || Object.getPrototypeOf(Profile)).apply(this, arguments));
  }

  _createClass(Profile, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        route: 'profile',
        loggedIn: false
      });
    }
  }, {
    key: 'loggedInDescriber',
    value: function loggedInDescriber() {
      var _this2 = this;

      var page = void 0;
      if (this.state.loggedIn) {
        page = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            this.state.user.name
          )
        );
      } else {
        page = _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'h1',
            null,
            'Login with Facebook'
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/', className: 'ui button' },
            'Cancel'
          ),
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                fetch('/login', { method: 'POST' }).then(function (res) {
                  return res.json();
                }).then(function (user) {
                  return _this2.setState({ user: user, loggedIn: true });
                });
              }, className: 'ui button right floated color blue' },
            'Login'
          )
        );
      }
      return page;
    }
  }, {
    key: 'render',
    value: function render() {
      return this.loggedInDescriber();
    }
  }]);

  return Profile;
}(_react2.default.Component);

exports.default = Profile;