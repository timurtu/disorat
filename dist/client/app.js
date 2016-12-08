'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

var _reactDom = require('react-dom');

var _reactRouter = require('react-router');

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_reactGa2.default.initialize('UA-87619352-1'); /**
                                                * Created by timur on 11/11/16.
                                                */

(0, _reactDom.render)(_react2.default.createElement(_reactRouter.Router, { onUpdate: function onUpdate() {
    window.scrollTo(0, 0);
    _reactGa2.default.set({ page: window.location.pathname });
    _reactGa2.default.pageview(window.location.pathname);
  }, routes: _routes2.default, history: _reactRouter.browserHistory }), document.getElementById('root'));