'use strict';

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _db = require('../tools/db');

var _db2 = _interopRequireDefault(_db);

var _utils = require('../tools/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.post('/posts/:id/upvote1', function (req, res) {

  var id = req.params.id;

  _db2.default.hgetAsync('feed', id).then(function (p) {
    return JSON.parse(p);
  }).then(function (p) {
    var inc = { option1votes: p.option1votes += 1 };
    var post = Object.assign({}, p, inc);

    _db2.default.hsetAsync('feed', id, JSON.stringify(post)).then(function (x) {
      return res.json(post);
    }).catch(_utils.onError);
  }).catch(_utils.onError);
}); /**
     * Created by timur on 11/21/16.
     */

_app2.default.post('/posts/:id/upvote2', function (req, res) {

  var id = req.params.id;

  _db2.default.hgetAsync('feed', id).then(function (p) {
    return JSON.parse(p);
  }).then(function (p) {
    var inc = { option2votes: p.option2votes += 1 };
    var post = Object.assign({}, p, inc);

    _db2.default.hsetAsync('feed', id, JSON.stringify(post)).then(function (x) {
      return res.json(post);
    }).catch(_utils.onError);
  }).catch(_utils.onError);
});