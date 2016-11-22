'use strict';

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _db = require('../tools/db');

var _db2 = _interopRequireDefault(_db);

var _utils = require('../tools/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.post('/posts/:id/upvote1', function (req, res) {

  var id = req.params.id;

  _db2.default.lrangeAsync('posts', 0, -1).then(function (posts) {

    var index = void 0;

    var post = JSON.parse(posts.find(function (p, i) {
      index = i;
      return JSON.parse(p).id == id;
    }));

    var inc = post.option1votes += 1;
    var incPost = Object.assign({}, post, { option1votes: inc });

    _db2.default.lsetAsync('posts', index, JSON.stringify(incPost)).then(function (p) {
      res.json(incPost);
    }).catch(_utils.onError);
  }).catch(_utils.onError);
}); /**
     * Created by timur on 11/21/16.
     */

_app2.default.post('/posts/:id/upvote2', function (req, res) {

  var id = req.params.id;

  _db2.default.lrangeAsync('posts', 0, -1).then(function (posts) {

    var index = void 0;

    var post = JSON.parse(posts.find(function (p, i) {
      index = i;
      return JSON.parse(p).id == id;
    }));

    var inc = post.option2votes += 1;
    var incPost = Object.assign({}, post, { option2votes: inc });

    _db2.default.lsetAsync('posts', index, JSON.stringify(incPost)).then(function (p) {
      res.json(incPost);
    }).catch(_utils.onError);
  }).catch(_utils.onError);
});