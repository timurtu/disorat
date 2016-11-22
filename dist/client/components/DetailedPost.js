'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('whatwg-fetch');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSimplePieChart = require('react-simple-pie-chart');

var _reactSimplePieChart2 = _interopRequireDefault(_reactSimplePieChart);

var _Ad = require('./Ad');

var _Ad2 = _interopRequireDefault(_Ad);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by timur on 11/14/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ProgressBar = function ProgressBar(_ref) {
  var opt1votes = _ref.opt1votes,
      opt2votes = _ref.opt2votes;
  return _react2.default.createElement(
    'div',
    { style: {
        maxWidth: '50%',
        margin: '0 auto'
      } },
    _react2.default.createElement(_reactSimplePieChart2.default, { slices: [{
        color: '#00B5AD',
        value: opt1votes || 1
      }, {
        color: '#F2711C',
        value: opt2votes || 1
      }] })
  );
};

var reason1 = void 0,
    reason2 = void 0;

var DetailedPost = function (_React$Component) {
  _inherits(DetailedPost, _React$Component);

  function DetailedPost() {
    _classCallCheck(this, DetailedPost);

    return _possibleConstructorReturn(this, (DetailedPost.__proto__ || Object.getPrototypeOf(DetailedPost)).apply(this, arguments));
  }

  _createClass(DetailedPost, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setState({
        message: '404: Page not found!',
        reasons1: [],
        reasons2: []
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      fetch('/posts' + location.pathname, { method: 'POST' }).then(function (res) {
        return res.json();
      }).then(function (p) {
        var _JSON$parse = JSON.parse(p),
            id = _JSON$parse.id,
            title = _JSON$parse.title,
            option1 = _JSON$parse.option1,
            option2 = _JSON$parse.option2,
            option1votes = _JSON$parse.option1votes,
            option2votes = _JSON$parse.option2votes,
            reasons1 = _JSON$parse.reasons1,
            reasons2 = _JSON$parse.reasons2;

        _this2.setState({
          id: id,
          title: title,
          option1: option1,
          option2: option2,
          option1votes: option1votes,
          option2votes: option2votes,
          reasons1: _this2.sortReasons(reasons1),
          reasons2: _this2.sortReasons(reasons2)
        });

        var docTitle = document.querySelector('title');
        docTitle.textContent = 'disorat | ' + title + ' | ' + option1 + ' vs ' + option2;
      });
    }
  }, {
    key: 'sortReasons',
    value: function sortReasons(reasons) {
      return reasons.sort(function (a, b) {
        return b.count - a.count;
      });
    }
  }, {
    key: 'handleReason1Change',
    value: function handleReason1Change(e) {
      reason1 = e.target.value;
    }
  }, {
    key: 'handleReason2Change',
    value: function handleReason2Change(e) {
      reason2 = e.target.value;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'h1',
          null,
          this.state.title
        ),
        _react2.default.createElement(
          'div',
          { className: 'ui grid' },
          _react2.default.createElement(
            'div',
            { className: 'eight wide column' },
            _react2.default.createElement(
              'div',
              { className: 'ui inverted segment' },
              _react2.default.createElement(
                'h3',
                null,
                this.state.option1
              ),
              _react2.default.createElement(
                'h5',
                null,
                this.state.option1votes,
                ' votes'
              ),
              _react2.default.createElement(
                'button',
                { onClick: function onClick() {
                    fetch('/posts/' + _this3.state.id + '/upvote1', { method: 'POST' }).then(function (res) {
                      return res.json();
                    }).then(function (post) {
                      _this3.setState({ option1votes: post.option1votes });
                    });
                  }, className: 'fluid ui inverted button colored teal' },
                this.state.option1
              ),
              _react2.default.createElement(_Ad2.default, null),
              _react2.default.createElement(
                'form',
                { onSubmit: function onSubmit(e) {

                    e.preventDefault();

                    if (reason1) {
                      fetch('/reason/' + _this3.state.id + '/' + reason1 + '/reason1', { method: 'POST' }).then(function (res) {
                        return res.json();
                      }).then(function (p) {
                        return _this3.setState({ reasons1: _this3.sortReasons(p.reasons1) });
                      });
                    }
                  }, className: 'ui inverted form' },
                _react2.default.createElement(
                  'div',
                  { className: 'field' },
                  _react2.default.createElement(
                    'label',
                    null,
                    'Add a new reason'
                  ),
                  _react2.default.createElement('input', { onChange: this.handleReason1Change, placeholder: 'Reason to vote for ' + this.state.option1,
                    type: 'text' })
                ),
                _react2.default.createElement(
                  'button',
                  { className: 'ui inverted tiny right floated submit button' },
                  'Add reason'
                )
              ),
              _react2.default.createElement('div', { className: 'ui hidden divider' }),
              _react2.default.createElement('div', { className: 'ui hidden divider' }),
              _react2.default.createElement(
                'h5',
                null,
                'Reasons'
              ),
              _react2.default.createElement(
                'div',
                { className: 'ui inverted list' },
                this.state.reasons1.map(function (r, i) {
                  return _react2.default.createElement(
                    'a',
                    { onClick: function onClick() {
                        fetch('/reason/' + _this3.state.id + '/' + r.reason + '/reason1', { method: 'POST' }).then(function (res) {
                          return res.json();
                        }).then(function (p) {
                          return _this3.setState({ reasons1: _this3.sortReasons(p.reasons1) });
                        });
                      }, className: 'item', key: i },
                    _react2.default.createElement('i', { className: 'plus icon' }),
                    _react2.default.createElement(
                      'div',
                      { className: 'content' },
                      _react2.default.createElement(
                        'div',
                        { className: 'header' },
                        r.count
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'description' },
                        r.reason
                      )
                    )
                  );
                })
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'eight wide column' },
            _react2.default.createElement(
              'div',
              { className: 'ui inverted segment' },
              _react2.default.createElement(
                'h3',
                null,
                this.state.option2
              ),
              _react2.default.createElement(
                'h5',
                null,
                this.state.option2votes,
                ' votes'
              ),
              _react2.default.createElement(
                'button',
                { onClick: function onClick() {
                    fetch('/posts/' + _this3.state.id + '/upvote2', { method: 'POST' }).then(function (res) {
                      return res.json();
                    }).then(function (post) {
                      _this3.setState({ option2votes: post.option2votes });
                    });
                  }, className: 'fluid ui inverted button colored orange' },
                this.state.option2
              ),
              _react2.default.createElement(_Ad2.default, null),
              _react2.default.createElement(
                'form',
                { onSubmit: function onSubmit(e) {
                    e.preventDefault();
                    if (reason2) {
                      fetch('/reason/' + _this3.state.id + '/' + reason2 + '/reason2', { method: 'POST' }).then(function (res) {
                        return res.json();
                      }).then(function (p) {
                        return _this3.setState({ reasons2: _this3.sortReasons(p.reasons2) });
                      });
                    }
                  }, className: 'ui inverted form' },
                _react2.default.createElement(
                  'div',
                  { className: 'field' },
                  _react2.default.createElement(
                    'label',
                    null,
                    'Add a new reason'
                  ),
                  _react2.default.createElement('input', { onChange: this.handleReason2Change, placeholder: 'Reason to vote for ' + this.state.option2,
                    type: 'text' })
                ),
                _react2.default.createElement(
                  'button',
                  { className: 'ui inverted tiny right floated submit button' },
                  'Add reason'
                )
              ),
              _react2.default.createElement('div', { className: 'ui hidden divider' }),
              _react2.default.createElement('div', { className: 'ui hidden divider' }),
              _react2.default.createElement(
                'h5',
                null,
                'Reasons'
              ),
              _react2.default.createElement(
                'div',
                { className: 'ui inverted list' },
                this.state.reasons2.map(function (r, i) {
                  return _react2.default.createElement(
                    'a',
                    { onClick: function onClick() {
                        fetch('/reason/' + _this3.state.id + '/' + r.reason + '/reason2', { method: 'POST' }).then(function (res) {
                          return res.json();
                        }).then(function (p) {
                          return _this3.setState({ reasons2: _this3.sortReasons(p.reasons2) });
                        });
                      }, className: 'item', key: i },
                    _react2.default.createElement('i', { className: 'plus icon' }),
                    _react2.default.createElement(
                      'div',
                      { className: 'content' },
                      _react2.default.createElement(
                        'div',
                        { className: 'header' },
                        r.count
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'description' },
                        r.reason
                      )
                    )
                  );
                })
              )
            )
          )
        ),
        _react2.default.createElement('div', { className: 'ui hidden divider' }),
        _react2.default.createElement(ProgressBar, { opt1votes: this.state.option1votes, opt2votes: this.state.option2votes })
      );
    }
  }]);

  return DetailedPost;
}(_react2.default.Component);

exports.default = DetailedPost;