'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (req, res, next) {

  var start = +new Date();

  res.on('finish', function () {
    var duration = +new Date() - start;
    (0, _gutilColorLog2.default)('cyan', req.method + ' request to ' + req.url + ' took ' + duration + 'ms');
  });

  next();
};

var _gutilColorLog = require('gutil-color-log');

var _gutilColorLog2 = _interopRequireDefault(_gutilColorLog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }