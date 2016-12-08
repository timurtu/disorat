'use strict';

var _app = require('../app');

var _app2 = _interopRequireDefault(_app);

var _db = require('../tools/db');

var _db2 = _interopRequireDefault(_db);

var _utils = require('../tools/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sortByVotes = function sortByVotes(x, y) {
  var total1 = x.option1votes + x.option2votes;
  var total2 = y.option1votes + y.option2votes;

  return total2 - total1;
}; /**
    * Created by timur on 11/21/16.
    */

_app2.default.post('/posts', function (req, res) {

  _db2.default.hgetallAsync('feed').then(function (postsMap) {

    var posts = [];

    for (var id in postsMap) {
      posts.push(JSON.parse(postsMap[id]));
    }

    var sortedPosts = posts.sort(sortByVotes);

    res.json(sortedPosts);
  }).catch(_utils.onError);
});