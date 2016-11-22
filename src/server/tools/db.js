/**
 * Created by timur on 11/11/16.
 */

import redis from 'redis'
import Promise from 'bluebird'
import { onError } from './utils'


Promise.promisifyAll(redis.RedisClient.prototype)
Promise.promisifyAll(redis.Multi.prototype)

// prod
const db = redis.createClient({ host: 'redis-10757.c10.us-east-1-3.ec2.cloud.redislabs.com', port: '10757' })

// dev
// const db = redis.createClient()

db.on('error', onError)

export default db