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

      const sortedPosts = posts.sort(function(x, y) {
        const post1 = JSON.parse(x)
        const post2 = JSON.parse(y)

        const post1Total = post1.option1votes + post1.option2votes
        const post2Total = post2.option1votes + post2.option2votes

        return post2Total - post1Total
      })

      if (req.query.limit >= 0) {
        res.json(sortedPosts.slice(0, req.query.limit))
      } else {
        res.json(sortedPosts)
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

app.post('/posts/:id/upvote1', (req, res) => {

  const id = req.params.id

  db.lrangeAsync('posts', 0, -1)
    .then(posts => {

      let index

      const post = JSON.parse(posts.find((p, i) => {
        index = i
        return JSON.parse(p).id == id
      }))

      const inc = post.option1votes += 1
      const incPost = Object.assign({}, post, { option1votes: inc })

      db.lsetAsync('posts', index, JSON.stringify(incPost))
        .then(p => {
          res.json(incPost)
        }).catch(onError)

    }).catch(onError)
})

app.post('/posts/:id/upvote2', (req, res) => {

  const id = req.params.id

  db.lrangeAsync('posts', 0, -1)
    .then(posts => {

      let index

      const post = JSON.parse(posts.find((p, i) => {
        index = i
        return JSON.parse(p).id == id
      }))

      const inc = post.option2votes += 1
      const incPost = Object.assign({}, post, { option2votes: inc })

      db.lsetAsync('posts', index, JSON.stringify(incPost))
        .then(p => {
          res.json(incPost)
        }).catch(onError)

    }).catch(onError)
})

app.post('/create', (req, res) => {

  const id = Math.floor(Math.random() * Date.now())
  const post = JSON.stringify(Object.assign({}, JSON.parse(req.query.post), {
    id,
    option1votes: 0,
    option2votes: 0
  }))

  db.lpushAsync('posts', post)
    .then(p => {
      log('green', p)
    })

  res.json(JSON.parse(post))
})

app.post('/reason/:id/:reason/reason1', (req, res) => {

  const id = req.params.id
  const reason = req.params.reason

  console.log('id', id)
  console.log('reason', reason)

  db.lrangeAsync('posts', 0, -1)
    .then(posts => {

      let index

      const post = JSON.parse(posts.find((p, i) => {
        index = i
        return JSON.parse(p).id == id
      }))

      const reasons = post.reasons || []
      const postWithReason = Object.assign({}, post, { reasons })

      db.lsetAsync('posts', index, JSON.stringify(incPost))
        .then(p => {
          res.json(postWithReason)
        }).catch(onError)

    }).catch(onError)
})
