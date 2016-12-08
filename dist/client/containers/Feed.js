'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('whatwg-fetch');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactLazyload = require('react-lazyload');

var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

var _Post = require('../components/Post');

var _Post2 = _interopRequireDefault(_Post);

var _Loading = require('../components/Loading');

var _Loading2 = _interopRequireDefault(_Loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by timur on 11/12/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Feed = function (_React$Component) {
  _inherits(Feed, _React$Component);

  function Feed() {
    _classCallCheck(this, Feed);

    return _possibleConstructorReturn(this, (Feed.__proto__ || Object.getPrototypeOf(Feed)).apply(this, arguments));
  }

  _createClass(Feed, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        posts: [],
        loading: true
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      fetch('/posts', { method: 'POST' }).then(function (res) {
        return res.json();
      }).then(function (posts) {
        _this2.setState({
          posts: posts,
          loading: false
        });

        var docTitle = document.querySelector('title');
        docTitle.textContent = 'disorat | Vote on Anything';
      }).catch(function (e) {
        return console.error(e);
      });
    }
  }, {
    key: 'posts',
    value: function posts() {
      return this.state.posts.map(function (p, i) {
        if (i % 3 === 0) {
          return _react2.default.createElement(
            _reactLazyload2.default,
            { key: i, height: 170 },
            _react2.default.createElement(_Post2.default, { ad: true, post: p })
          );
        } else {
          return _react2.default.createElement(
            _reactLazyload2.default,
            { key: i, height: 170 },
            _react2.default.createElement(_Post2.default, { ad: false, post: p })
          );
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.state.loading ? _react2.default.createElement(_Loading2.default, null) : _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'ui one cards' },
            this.posts()
          ),
          _react2.default.createElement(
            _reactRouter.Link,
            { to: '/create', style: {
                position: 'fixed',
                right: '1em',
                bottom: '1em',
                zIndex: '4',
                boxShadow: '0 3px 5px rgba(0, 0, 0, .25)'
              }, className: 'massive circular ui color blue icon button' },
            _react2.default.createElement('i', { className: 'plus icon' })
          )
        )
      );
    }
  }]);

  return Feed;
}(_react2.default.Component);

exports.default = Feed;