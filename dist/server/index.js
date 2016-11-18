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

    var sortedPosts = posts.sort(function (x, y) {
      var post1 = JSON.parse(x);
      var post2 = JSON.parse(y);

      var post1Total = post1.option1votes + post1.option2votes;
      var post2Total = post2.option1votes + post2.option2votes;

      return post2Total - post1Total;
    });

    (0, _gutilColorLog2.default)('cyan', sortedPosts);

    if (req.query.limit >= 0) {
      res.json(sortedPosts.slice(0, req.query.limit));
    } else {
      res.json(sortedPosts);
    }
  }).catch(_utils.onError);
});

_app2.default.post('/posts/:id', function (req, res) {
  var id = req.params.id;
  _db2.default.lrangeAsync('posts', 0, -1).then(function (posts) {
    var post = JSON.parse(posts.find(function (p) {
      return JSON.parse(p).id == id;
    }));

    var postWithReasons = Object.assign({}, post, {
      reasons1: post.reasons1 || [],
      reasons2: post.reasons2 || []
    });

    res.json(JSON.stringify(postWithReasons));
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
    id: id,
    option1votes: 0,
    option2votes: 0,
    reasons1: [],
    reasons2: []
  }));

  _db2.default.lpushAsync('posts', post).then(function (p) {
    (0, _gutilColorLog2.default)('green', p);
  });

  res.json(JSON.parse(post));
});

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
});

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