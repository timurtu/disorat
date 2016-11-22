/**
 * Created by timur on 11/11/16.
 */

import 'babel-polyfill'
import db from './tools/db'
import { onError } from './tools/utils'
import app from './app'
import './routes/feed'
import './routes/create'


const sendIndex = (req, res) => {
  res.sendfile('public/index.html')
}

app.get('*', sendIndex)


app.post('/posts/:id', (req, res) => {
  const id = req.params.id
  db.lrangeAsync('posts', 0, -1)
    .then(posts => {
      const post = JSON.parse(posts.find(p => JSON.parse(p).id == id))

      const postWithReasons = Object.assign({}, post, {
        reasons1: post.reasons1 || [],
        reasons2: post.reasons2 || []
      })

      res.json(JSON.stringify(postWithReasons))
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


app.post('/reason/:id/:reason/reason1', (req, res) => {

  const id = req.params.id
  const reason = req.params.reason

  db.lrangeAsync('posts', 0, -1)
    .then(posts => {

      let index

      const post = JSON.parse(posts.find((p, i) => {
        index = i
        return JSON.parse(p).id == id
      }))

      const matches = post.reasons1.find(r => r.reason === reason)

      if (matches) {
        const rIndex = post.reasons1.indexOf(matches)
        post.reasons1[rIndex].count++
      } else {
        post.reasons1.unshift({ reason, count: 1 })
      }

      db.lsetAsync('posts', index, JSON.stringify(post))
        .then(p => {
          res.json(post)
        }).catch(onError)

    }).catch(onError)
})

app.post('/reason/:id/:reason/reason2', (req, res) => {

  const id = req.params.id
  const reason = req.params.reason

  db.lrangeAsync('posts', 0, -1)
    .then(posts => {

      let index

      const post = JSON.parse(posts.find((p, i) => {
        index = i
        return JSON.parse(p).id == id
      }))

      const matches = post.reasons2.find(r => r.reason === reason)

      if (matches) {
        const rIndex = post.reasons2.indexOf(matches)
        post.reasons2[rIndex].count++
      } else {
        post.reasons2.unshift({ reason, count: 1 })
      }

      db.lsetAsync('posts', index, JSON.stringify(post))
        .then(p => {
          res.json(post)
        }).catch(onError)

    }).catch(onError)
})
