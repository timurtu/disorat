'use strict';

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _db = require('../tools/db');

var _db2 = _interopRequireDefault(_db);

var _utils = require('../tools/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.post('/posts', function (req, res) {
  _db2.default.lrangeAsync('posts', 0, -1).then(function (posts) {

    var sortedPosts = posts.sort(function (x, y) {

      var post1 = JSON.parse(x);
      var post2 = JSON.parse(y);

      var post1Total = post1.option1votes + post1.option2votes;
      var post2Total = post2.option1votes + post2.option2votes;

      return post2Total - post1Total;
    });

    if (req.query.limit >= 0) {
      res.json(sortedPosts.slice(0, req.query.limit));
    } else {
      res.json(sortedPosts);
    }
  }).catch(_utils.onError);
}); /**
     * Created by timur on 11/21/16.
     */