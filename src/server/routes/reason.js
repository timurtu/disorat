/**
 * Created by timur on 11/21/16.
 */

import app from '../app'
import db from '../tools/db'
import { onError } from '../tools/utils'


app.post('/reason/:id/:reason/reason1', (req, res) => {

  const id = req.params.id
  const reason = req.params.reason

  db.hgetAsync('feed', id)
    .then(p => {
      const post = JSON.parse(p)

      const matches = post.reasons1.find(r => r.reason === reason)

      if (matches) {
        const rIndex = post.reasons1.indexOf(matches)
        post.reasons1[rIndex].count++
      } else {
        post.reasons1.unshift({ reason, count: 1 })
      }

      db.hsetAsync('feed', id, JSON.stringify(post))
        .then(x => res.json(post))
        .catch(onError)
    })
    .catch(onError)
})

app.post('/reason/:id/:reason/reason2', (req, res) => {

  const id = req.params.id
  const reason = req.params.reason

  db.hgetAsync('feed', id)
    .then(p => {
      const post = JSON.parse(p)

      const matches = post.reasons2.find(r => r.reason === reason)

      if (matches) {
        const rIndex = post.reasons2.indexOf(matches)
        post.reasons2[rIndex].count++
      } else {
        post.reasons2.unshift({ reason, count: 1 })
      }

      db.hsetAsync('feed', id, JSON.stringify(post))
        .then(x => res.json(post))
        .catch(onError)
    })
    .catch(onError)
})