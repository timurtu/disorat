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

var cachedPosts = void 0;

var Navbar = function (_React$Component) {
  _inherits(Navbar, _React$Component);

  function Navbar(props) {
    _classCallCheck(this, Navbar);

    var _this = _possibleConstructorReturn(this, (Navbar.__proto__ || Object.getPrototypeOf(Navbar)).call(this, props));

    _this.state = {
      loading: false,
      results: []
    };
    return _this;
  }

  _createClass(Navbar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { style: {
            position: 'fixed',
            left: '5.5em',
            zIndex: 4,
            top: '.5em'
          }, className: 'ui right aligned category search ' + (this.state.loading ? 'loading' : '') },
        _react2.default.createElement(
          'div',
          { className: 'ui icon input' },
          _react2.default.createElement('input', { onChange: function onChange(e) {

              var query = e.target.value.toLowerCase();
              _this2.setState({ loading: true });

              if (cachedPosts) {

                var data = cachedPosts.filter(function (x) {
                  return x.content.toLowerCase().startsWith(query);
                });

                _this2.setState({
                  loading: false,
                  results: data.slice(0, 5)
                });
              } else {
                fetch('/posts', { method: 'POST' }).then(function (res) {
                  return res.json();
                }).then(function (posts) {

                  cachedPosts = posts.reduce(function (x, y) {
                    var title = y.title,
                        id = y.id;

                    return x.concat([{ id: id, title: title, content: y.title }, { id: id, title: title, content: y.option1 }, { id: id, title: title, content: y.option2 }]);
                  }, []).reduce(function (x, y) {
                    var title = y.title,
                        id = y.id,
                        content = y.content;

                    var words = content.trim().split(/\s/);

                    return x.concat(words.map(function (w) {
                      return {
                        title: title, id: id, content: w, fullContent: content
                      };
                    }));
                  }, []);

                  var data = cachedPosts.filter(function (x) {
                    return x.content.toLowerCase().startsWith(query);
                  });

                  _this2.setState({
                    loading: false,
                    results: data.slice(0, 5)
                  });
                }).catch(function (err) {
                  return console.error(err);
                });

                if (!query) {
                  _this2.setState({
                    loading: false,
                    results: []
                  });
                }
              }
            }, className: 'prompt', type: 'text', placeholder: this.props.default }),
          _react2.default.createElement('i', { className: 'search icon' })
        ),
        this.state.results.length > 0 ? _react2.default.createElement(
          'div',
          { style: { position: 'fixed' } },
          _react2.default.createElement(
            'div',
            { className: 'ui inverted segment' },
            _react2.default.createElement(
              'div',
              { className: 'ui inverted relaxed divided list' },
              this.state.results.map(function (top, i) {
                return _react2.default.createElement(
                  _reactRouter.Link,
                  { to: '/' + top.id, key: i, className: 'item', onClick: function onClick() {
                      _this2.setState({ results: [] });
                    } },
                  _react2.default.createElement(
                    'div',
                    { style: { minWidth: '10em', overflowWrap: 'break-word' }, className: 'content' },
                    _react2.default.createElement(
                      'div',
                      { className: 'header' },
                      top.fullContent
                    ),
                    top.title
                  )
                );
              })
            )
          )
        ) : null
      );
    }
  }]);

  return Navbar;
}(_react2.default.Component);

exports.default = Navbar;