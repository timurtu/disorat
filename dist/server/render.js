'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _reactRouter = require('react-router');

var _routes = require('../client/routes');

var _routes2 = _interopRequireDefault(_routes);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.get('*', function (req, res) {
  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
    var html = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));
    res.send(renderPage(html));
  });
}); /**
     * Created by timur on 12/5/16.
     */

function renderPage(html) {
  return '\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n        <meta charset="UTF-8">\n        <title>disorat | Vote on Anything</title>\n        <meta name="fragment" content="!">\n        <meta name="description"\n              content="Vote on anything anonymously in real time. Create and share a post with your friends or family to settle an argument."/>\n        <meta name="keywords" content="vote,on,anything,anonymous,real time,create,share,post,argument"/>\n        <meta name="robots" content="index,follow"/>\n        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>\n        <link rel="stylesheet" href="https://cdn.jsdelivr.net/semantic-ui/2.2.6/semantic.min.css">\n    </head>\n    \n    <body style="background:rgba(0,0,0,0.82);">\n    \n    <div id="root">' + html + '</div>\n    \n    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>\n    <script src="https://cdn.jsdelivr.net/semantic-ui/2.2.6/semantic.min.js"></script>\n    <script src="bundle.js"></script>\n    \n    </body>\n    </html>\n  ';
}

{/*<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>*/}