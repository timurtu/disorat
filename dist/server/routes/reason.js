'use strict';

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _db = require('../tools/db');

var _db2 = _interopRequireDefault(_db);

var _utils = require('../tools/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.post('/reason/:id/:reason/reason1', function (req, res) {

  var id = req.params.id;
  var reason = req.params.reason;

  _db2.default.lrangeAsync('posts', 0, -1).then(function (posts) {

    var index = void 0;

    var post = JSON.parse(posts.find(function (p, i) {
      index = i;
      return JSON.parse(p).id == id;
    }));

    var matches = post.reasons1.find(function (r) {
      return r.reason === reason;
    });

    if (matches) {
      var rIndex = post.reasons1.indexOf(matches);
      post.reasons1[rIndex].count++;
    } else {
      post.reasons1.unshift({ reason: reason, count: 1 });
    }

    _db2.default.lsetAsync('posts', index, JSON.stringify(post)).then(function (p) {
      res.json(post);
    }).catch(_utils.onError);
  }).catch(_utils.onError);
}); /**
     * Created by timur on 11/21/16.
     */

_app2.default.post('/reason/:id/:reason/reason2', function (req, res) {

  var id = req.params.id;
  var reason = req.params.reason;

  _db2.default.lrangeAsync('posts', 0, -1).then(function (posts) {

    var index = void 0;

    var post = JSON.parse(posts.find(function (p, i) {
      index = i;
      return JSON.parse(p).id == id;
    }));

    var matches = post.reasons2.find(function (r) {
      return r.reason === reason;
    });

    if (matches) {
      var rIndex = post.reasons2.indexOf(matches);
      post.reasons2[rIndex].count++;
    } else {
      post.reasons2.unshift({ reason: reason, count: 1 });
    }

    _db2.default.lsetAsync('posts', index, JSON.stringify(post)).then(function (p) {
      res.json(post);
    }).catch(_utils.onError);
  }).catch(_utils.onError);
});