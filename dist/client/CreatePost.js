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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Created by timur on 11/12/16.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

$(function () {
  $('.dropdown').dropdown();
});

var title = void 0,
    option1 = void 0,
    option2 = void 0;

var CreatePost = function (_React$Component) {
  _inherits(CreatePost, _React$Component);

  function CreatePost() {
    _classCallCheck(this, CreatePost);

    return _possibleConstructorReturn(this, (CreatePost.__proto__ || Object.getPrototypeOf(CreatePost)).apply(this, arguments));
  }

  _createClass(CreatePost, [{
    key: 'handleTitleChange',
    value: function handleTitleChange(e) {
      title = e.target.value;
    }
  }, {
    key: 'handleOption1Change',
    value: function handleOption1Change(e) {
      option1 = e.target.value;
    }
  }, {
    key: 'handleOption2Change',
    value: function handleOption2Change(e) {
      option2 = e.target.value;
    }
  }, {
    key: 'createPost',
    value: function createPost(e) {
      e.preventDefault();

      if (title && option1 && option2) {
        fetch('/create?post=' + JSON.stringify({ title: title, option1: option1, option2: option2 }), {
          method: 'POST'
        }).then(function (res) {
          return res.json();
        }).then(function (p) {
          location.href = p.id;
        }).catch(function (e) {
          return console.error(e);
        });
      } else {
        alert('All fields are required');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'form',
        { onSubmit: this.createPost, className: 'ui form' },
        _react2.default.createElement(
          'div',
          { className: 'required field' },
          _react2.default.createElement(
            'label',
            null,
            'Title'
          ),
          _react2.default.createElement('input', { onChange: this.handleTitleChange, name: 'title', type: 'text', placeholder: 'Short Explanation' })
        ),
        _react2.default.createElement(
          'div',
          { className: 'two fields' },
          _react2.default.createElement(
            'div',
            { className: 'required field' },
            _react2.default.createElement(
              'label',
              null,
              'Option 1'
            ),
            _react2.default.createElement('input', { onChange: this.handleOption1Change, name: 'option1', type: 'text', placeholder: 'First Option' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'required field' },
            _react2.default.createElement(
              'label',
              null,
              'Option 2'
            ),
            _react2.default.createElement('input', { onChange: this.handleOption2Change, name: 'option2', type: 'text', placeholder: 'Second Option' })
          )
        ),
        _react2.default.createElement(
          _reactRouter.Link,
          { to: '/', className: 'ui button' },
          'Cancel'
        ),
        _react2.default.createElement(
          'button',
          { className: 'ui right floated color blue submit button' },
          'Create'
        )
      );
    }
  }]);

  return CreatePost;
}(_react2.default.Component);

exports.default = CreatePost;