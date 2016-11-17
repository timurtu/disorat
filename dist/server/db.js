'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redis = require('redis');

var _redis2 = _interopRequireDefault(_redis);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bluebird2.default.promisifyAll(_redis2.default.RedisClient.prototype); /**
                                                                         * Created by timur on 11/11/16.
                                                                         */

_bluebird2.default.promisifyAll(_redis2.default.Multi.prototype);

// prod
var db = _redis2.default.createClient({ host: 'redis-10757.c10.us-east-1-3.ec2.cloud.redislabs.com', port: '10757' });

// dev
// const db = redis.createClient()

db.on('error', _utils.onError);

exports.default = db;