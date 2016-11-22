/**
 * Created by timur on 11/21/16.
 */

import app from '../app'
import db from '../tools/db'
import { onError } from '../tools/utils'


app.post('/posts/:id/upvote1', (req, res) => {

  const id = req.params.id

  db.hgetAsync('feed', id)
    .then(p => JSON.parse(p))
    .then(p => {
      const inc = { option1votes: p.option1votes += 1 }
      const post = Object.assign({}, p, inc)

      db.hsetAsync('feed', id, JSON.stringify(post))
        .then(x => res.json(post))
        .catch(onError)
    })
    .catch(onError)
})

app.post('/posts/:id/upvote2', (req, res) => {

  const id = req.params.id

  db.hgetAsync('feed', id)
    .then(p => JSON.parse(p))
    .then(p => {
      const inc = { option2votes: p.option2votes += 1 }
      const post = Object.assign({}, p, inc)

      db.hsetAsync('feed', id, JSON.stringify(post))
        .then(x => res.json(post))
        .catch(onError)
    })
    .catch(onError)
})
