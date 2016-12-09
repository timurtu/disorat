'use strict';

var _gutilColorLog = require('gutil-color-log');

var _gutilColorLog2 = _interopRequireDefault(_gutilColorLog);

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _db = require('../tools/db');

var _db2 = _interopRequireDefault(_db);

var _utils = require('../tools/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Created by timur on 11/21/16.
 */

_app2.default.post('/create', function (req, res) {

  var id = Math.floor(Math.random() * Date.now());
  var post = Object.assign({}, JSON.parse(req.query.post), {
    id: id,
    option1votes: 0,
    option2votes: 0,
    reasons1: [],
    reasons2: [],
    date: Date.now()
  });

  _db2.default.hsetAsync('feed', id, JSON.stringify(post)).then(function (p) {
    (0, _gutilColorLog2.default)('green', p);
  }).catch(_utils.onError);

  res.json(post);
});