'use strict';

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendIndex = function sendIndex(req, res) {
  res.sendfile('public/index.html');
}; /**
    * Created by timur on 11/21/16.
    */

_app2.default.get('*', sendIndex);