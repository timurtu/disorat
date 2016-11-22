/**
 * Created by timur on 11/21/16.
 */

import app from '../app'
import db from '../tools/db'
import { onError } from '../tools/utils'


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