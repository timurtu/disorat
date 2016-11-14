/**
 * Created by timur on 11/11/16.
 */

import 'babel-polyfill'
import log from 'gutil-color-log'
import co from 'co'
import db from './db'
import { onError } from './utils'
import app from './app'


app.get('*', (req, res) => {
  res.sendfile('public/index.html')
})

co(function*() {

  // Set key-value pairs
  db.set('message1', 'hello, this is doge')
  db.set('message2', 'hello, no this is spider')

  // Get key-value pairs
  const msg1 = yield db.getAsync('message1')
  const msg2 = yield db.getAsync('message2')

  log('cyan', msg1)
  log('cyan', msg2)

  const message = 'Hello, this is dog'
  // Push a message item to a list
  const length = yield db.lpushAsync('messages', message)
  log('green', length)

  // Remove a message item from the list
  yield db.lremAsync('messages', -1, message)

  // Get all items from a list
  const posts = yield db.lrangeAsync('messages', 0, -1)
  log('blue', posts)

  app.post('/posts', (req, res) => {

    if (req.query.limit >= 0) {
      res.json(posts.slice(0, req.query.limit))
    } else {
      res.json(posts)
    }
  })

}).catch(onError)
