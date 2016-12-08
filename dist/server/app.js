'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-register');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _gutilColorLog = require('gutil-color-log');

var _gutilColorLog2 = _interopRequireDefault(_gutilColorLog);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _logger = require('./tools/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by timur on 11/11/16.
 */

var app = (0, _express2.default)();
var port = process.env.PORT || 3000;

app.use((0, _compression2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());
app.use(_express2.default.static('public'));
app.use(_logger2.default);

app.listen(port, function () {
  return (0, _gutilColorLog2.default)('cyan', 'listening on port ' + port);
});

exports.default = app;