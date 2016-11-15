'use strict';

require('babel-polyfill');

var _gutilColorLog = require('gutil-color-log');

var _gutilColorLog2 = _interopRequireDefault(_gutilColorLog);

var _db = require('./db');

var _db2 = _interopRequireDefault(_db);

var _utils = require('./utils');

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sendIndex = function sendIndex(req, res) {
  res.sendfile('public/index.html');
}; /**
    * Created by timur on 11/11/16.
    */

_app2.default.get('*', sendIndex);

_app2.default.post('/posts', function (req, res) {
  _db2.default.lrangeAsync('posts', 0, -1).then(function (posts) {
    if (req.query.limit >= 0) {
      res.json(posts.slice(0, req.query.limit));
    } else {
      res.json(posts);
    }
  }).catch(_utils.onError);
});

_app2.default.post('/posts/:id', function (req, res) {
  var id = req.params.id;
  _db2.default.lrangeAsync('posts', 0, -1).then(function (posts) {
    var post = posts.find(function (p) {
      return JSON.parse(p).id == id;
    });
    res.json(post);
  }).catch(_utils.onError);
});

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
});

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

_app2.default.post('/create', function (req, res) {

  var id = Math.floor(Math.random() * Date.now());
  var post = JSON.stringify(Object.assign({}, JSON.parse(req.query.post), {
    id: id, option1votes: 0, option2votes: 0
  }));

  _db2.default.lpushAsync('posts', post).then(function (p) {
    (0, _gutilColorLog2.default)('green', p);
  });

  res.json(JSON.parse(post));
});