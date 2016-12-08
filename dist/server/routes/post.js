'use strict';

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _db = require('../tools/db');

var _db2 = _interopRequireDefault(_db);

var _utils = require('../tools/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.post('/posts/:id', function (req, res) {

  var id = req.params.id;

  _db2.default.hgetAsync('feed', id).then(function (p) {
    return JSON.parse(p);
  }).then(function (post) {
    var postWithReasons = Object.assign({}, post, {
      reasons1: post.reasons1 || [],
      reasons2: post.reasons2 || []
    });
    res.json(postWithReasons);
  }).catch(_utils.onError);
}); /**
     * Created by timur on 11/21/16.
     */