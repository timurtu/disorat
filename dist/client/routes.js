'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _App = require('./containers/App');

var _App2 = _interopRequireDefault(_App);

var _Feed = require('./containers/Feed');

var _Feed2 = _interopRequireDefault(_Feed);

var _CreatePost = require('./components/CreatePost');

var _CreatePost2 = _interopRequireDefault(_CreatePost);

var _DetailedPost = require('./containers/DetailedPost');

var _DetailedPost2 = _interopRequireDefault(_DetailedPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by timur on 12/5/16.
 */

var NotFound = function NotFound() {
  return _react2.default.createElement(
    'h1',
    null,
    '404 - Page not found'
  );
};

module.exports = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _App2.default },
  _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/feed' }),
  _react2.default.createElement(_reactRouter.Route, { path: '/feed', component: _Feed2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/create', component: _CreatePost2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '/:post', component: _DetailedPost2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '*', component: NotFound })
);