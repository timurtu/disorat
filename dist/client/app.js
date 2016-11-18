'use strict';

var _domali = require('domali');

var _domali2 = _interopRequireDefault(_domali);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _Navbar = require('./Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Feed = require('./Feed');

var _Feed2 = _interopRequireDefault(_Feed);

var _Profile = require('./Profile');

var _Profile2 = _interopRequireDefault(_Profile);

var _CreatePost = require('./CreatePost');

var _CreatePost2 = _interopRequireDefault(_CreatePost);

var _DetailedPost = require('./DetailedPost');

var _DetailedPost2 = _interopRequireDefault(_DetailedPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var App = function App(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Navbar2.default, null),
    _react2.default.createElement(
      'div',
      { style: {
          marginTop: '3em'
        }, className: 'ui segment' },
      children
    )
  );
}; /**
    * Created by timur on 11/11/16.
    */

var scrollTop = function scrollTop() {
  return window.scrollTo(0, 0);
};

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter.Router,
  { onUpdate: scrollTop, history: _reactRouter.browserHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: App },
    _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/feed' }),
    _react2.default.createElement(_reactRouter.Route, { path: '/feed', component: _Feed2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/profile', component: _Profile2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/create', component: _CreatePost2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/:title', component: _DetailedPost2.default })
  )
), _domali2.default.getId('root'));