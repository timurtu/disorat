/**
 * Created by timur on 11/11/16.
 */

import 'babel-polyfill'
import log from 'gutil-color-log'
import co from 'co'
import db from './db'
import { onError } from './utils'
import app from './app'


const sendIndex = (req, res) => {
  res.sendfile('public/index.html')
}

app.get('*', sendIndex)

co(function*() {

  const message = 'Hello, this is doge'
  const id = Math.floor(Math.random() * Date.now())

  // const post = JSON.stringify({message, id})
  // Push a message item to a list
  // const length = yield db.lpushAsync('posts', post)
  // log('green', length)

  // Get all items from a list
  const posts = yield db.lrangeAsync('posts', 0, -1)
  log('blue', posts)

  app.post('/posts', (req, res) => {

    if (req.query.limit >= 0) {
      res.json(posts.slice(0, req.query.limit))
    } else {
      res.json(posts)
    }
  })

  app.post('/posts/:id', (req, res) => {
    const id = req.params.id
    const post = posts.find(p => JSON.parse(p).id == id)
    res.json(post)
  })

  app.post('/posts/:id/upvote1', (req, res) => {
    const id = req.params.id
    const ps = posts.find(p => JSON.parse(p).id == id)



  })

}).catch(onError)
