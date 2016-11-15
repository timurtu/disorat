'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('whatwg-fetch');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactSimplePieChart = require('react-simple-pie-chart');

var _reactSimplePieChart2 = _interopRequireDefault(_reactSimplePieChart);

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
      this.setState({ posts: [] });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      fetch('/posts', { method: 'POST' }).then(function (res) {
        return res.json();
      }).then(function (ps) {
        var posts = ps.map(function (p) {
          return JSON.parse(p);
        });
        _this2.setState({ posts: posts });
      }).catch(function (e) {
        return console.error(e);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'ui cards' },
        this.state.posts.map(function (p) {
          return _react2.default.createElement(Post, { post: p, key: p.id });
        })
      );
    }
  }]);

  return Feed;
}(_react2.default.Component);

var ProgressBar = function ProgressBar(_ref) {
  var opt1votes = _ref.opt1votes,
      opt2votes = _ref.opt2votes;
  return _react2.default.createElement(
    'div',
    { className: 'ui right floated', style: { width: '3em' } },
    _react2.default.createElement(_reactSimplePieChart2.default, { slices: [{
        color: '#00B5AD',
        value: opt1votes || 1
      }, {
        color: '#F2711C',
        value: opt2votes || 1
      }] })
  );
};

var Post = function Post(_ref2) {
  var post = _ref2.post;


  return _react2.default.createElement(
    'div',
    { className: 'ui centered card' },
    _react2.default.createElement(
      _reactRouter.Link,
      { to: '/' + post.id, className: 'content' },
      _react2.default.createElement(
        'div',
        { className: 'header' },
        post.title
      ),
      _react2.default.createElement(ProgressBar, { opt1votes: post.option1votes, opt2votes: post.option2votes })
    ),
    _react2.default.createElement(
      'div',
      { className: 'extra content' },
      _react2.default.createElement(
        'div',
        { className: 'ui two buttons' },
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              fetch('/posts/' + post.id + '/upvote1', { method: 'POST' }).catch(function (e) {
                return console.error(e);
              });
            }, className: 'ui teal button' },
          post.option1
        ),
        _react2.default.createElement(
          'button',
          { onClick: function onClick() {
              fetch('/posts/' + post.id + '/upvote2', { method: 'POST' }).catch(function (e) {
                return console.error(e);
              });
            }, className: 'ui orange button' },
          post.option2
        )
      )
    )
  );
};
exports.default = Feed;