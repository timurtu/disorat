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

var _reactLazyload = require('react-lazyload');

var _reactLazyload2 = _interopRequireDefault(_reactLazyload);

var _reactGa = require('react-ga');

var _reactGa2 = _interopRequireDefault(_reactGa);

var _Ad = require('./Ad');

var _Ad2 = _interopRequireDefault(_Ad);

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
            _react2.default.createElement(Post, { ad: true, post: p })
          );
        } else {
          return _react2.default.createElement(
            _reactLazyload2.default,
            { key: i, height: 170 },
            _react2.default.createElement(Post, { ad: false, post: p })
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
              bottom: '2em',
              zIndex: '4',
              boxShadow: '0 3px 5px rgba(0, 0, 0, .25)'
            }, className: 'massive circular ui inverted color blue icon button' },
          _react2.default.createElement('i', { className: 'plus icon' })
        )
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
    { className: 'ui right floated', style: { width: '5em' } },
    _react2.default.createElement(_reactSimplePieChart2.default, { slices: [{
        color: '#00B5AD',
        value: opt1votes || 1
      }, {
        color: '#F2711C',
        value: opt2votes || 1
      }] })
  );
};

var Post = function (_React$Component2) {
  _inherits(Post, _React$Component2);

  function Post() {
    _classCallCheck(this, Post);

    return _possibleConstructorReturn(this, (Post.__proto__ || Object.getPrototypeOf(Post)).apply(this, arguments));
  }

  _createClass(Post, [{
    key: 'componentWillMount',
    value: function componentWillMount() {

      var post = this.props.post;
      var totalVotes = post.option1votes + post.option2votes;

      this.setState({ post: post, totalVotes: totalVotes });
    }
  }, {
    key: 'inverted',
    value: function inverted() {
      return {
        color: 'rgba(255,255,261,.9)'
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        { className: 'card', style: {
            backgroundColor: '#1B1C1D',
            border: '1px solid #1B1C1D',
            boxShadow: '0 1px 3px rgba(0,0,0, 0.25)'
          } },
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/' + this.state.post.id, className: 'content' },
          _react2.default.createElement(
            'div',
            { style: this.inverted(), className: 'header' },
            this.state.post.title
          ),
          _react2.default.createElement(
            'div',
            { style: this.inverted(), className: 'meta' },
            this.state.totalVotes,
            ' votes'
          ),
          _react2.default.createElement(ProgressBar, { opt1votes: this.state.post.option1votes, opt2votes: this.state.post.option2votes })
        ),
        this.props.ad ? _react2.default.createElement(_Ad2.default, null) : null,
        _react2.default.createElement(
          'div',
          { className: 'extra content' },
          _react2.default.createElement(
            'div',
            { className: 'ui two buttons' },
            _react2.default.createElement(
              'button',
              { onClick: function onClick() {
                  fetch('/posts/' + _this4.state.post.id + '/upvote1', { method: 'POST' }).then(function (res) {
                    return res.json();
                  }).then(function (post) {
                    var totalVotes = _this4.state.totalVotes + 1;
                    _reactGa2.default.event({
                      category: 'Vote',
                      action: 'Voted for ' + _this4.state.post.option1,
                      label: 'Homepage Thing'
                    });
                    _this4.setState({ post: post, totalVotes: totalVotes });
                  }).catch(function (e) {
                    return console.error(e);
                  });
                }, className: 'ui inverted teal button' },
              this.state.post.option1
            ),
            _react2.default.createElement(
              'button',
              { onClick: function onClick() {
                  fetch('/posts/' + _this4.state.post.id + '/upvote2', { method: 'POST' }).then(function (res) {
                    return res.json();
                  }).then(function (post) {
                    var totalVotes = _this4.state.totalVotes + 1;
                    _this4.setState({ post: post, totalVotes: totalVotes });
                  }).catch(function (e) {
                    return console.error(e);
                  });
                }, className: 'ui inverted orange button' },
              this.state.post.option2
            )
          )
        )
      );
    }
  }]);

  return Post;
}(_react2.default.Component);

exports.default = Feed;