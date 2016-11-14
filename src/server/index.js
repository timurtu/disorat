/**
 * Created by timur on 11/11/16.
 */

import 'babel-polyfill'
import log from 'gutil-color-log'
import db from './db'
import { onError } from './utils'
import app from './app'


const sendIndex = (req, res) => {
  res.sendfile('public/index.html')
}

app.get('*', sendIndex)

app.post('/posts', (req, res) => {
  db.lrangeAsync('posts', 0, -1)
    .then(posts => {
      if (req.query.limit >= 0) {
        res.json(posts.slice(0, req.query.limit))
      } else {
        res.json(posts)
      }
    }).catch(onError)
})

app.post('/posts/:id', (req, res) => {
  const id = req.params.id
  db.lrangeAsync('posts', 0, -1)
    .then(posts => {
      const post = posts.find(p => JSON.parse(p).id == id)
      res.json(post)
    }).catch(onError)
})

app.post('/create', (req, res) => {

  const id = Math.floor(Math.random() * Date.now())
  const post = JSON.stringify(Object.assign({}, JSON.parse(req.query.post), {
    id, option1votes: 0, option2votes: 0
  }))

  db.lpushAsync('posts', post)
    .then(p => {
      log('green', p)
    })

  res.json(JSON.parse(post))
})
