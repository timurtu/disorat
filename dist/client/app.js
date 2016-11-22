'use strict';

var _domali = require('domali');

var _domali2 = _interopRequireDefault(_domali);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = require('react-router');

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

var _Navbar = require('./components/Navbar');

var _Navbar2 = _interopRequireDefault(_Navbar);

var _Feed = require('./components/Feed');

var _Feed2 = _interopRequireDefault(_Feed);

var _CreatePost = require('./components/CreatePost');

var _CreatePost2 = _interopRequireDefault(_CreatePost);

var _DetailedPost = require('./components/DetailedPost');

var _DetailedPost2 = _interopRequireDefault(_DetailedPost);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import Profile from './components/Profile'
_reactGa2.default.initialize('UA-87619352-1'); /**
                                                * Created by timur on 11/11/16.
                                                */

var App = function App(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(_Navbar2.default, null),
    _react2.default.createElement(
      'div',
      { style: {
          marginTop: '3em',
          backgroundColor: '#000'
        }, className: 'ui inverted segment' },
      children
    )
  );
};

function logPageView() {
  window.scrollTo(0, 0);
  _reactGa2.default.set({ page: window.location.pathname });
  _reactGa2.default.pageview(window.location.pathname);
}

_reactDom2.default.render(_react2.default.createElement(
  _reactRouter.Router,
  { onUpdate: logPageView, history: _reactRouter.browserHistory },
  _react2.default.createElement(
    _reactRouter.Route,
    { path: '/', component: App },
    _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/feed' }),
    _react2.default.createElement(_reactRouter.Route, { path: '/feed', component: _Feed2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/create', component: _CreatePost2.default }),
    _react2.default.createElement(_reactRouter.Route, { path: '/:id', component: _DetailedPost2.default })
  )
), _domali2.default.getId('root'));