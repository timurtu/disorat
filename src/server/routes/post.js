/**
 * Created by timur on 11/21/16.
 */

import app from '../app'
import db from '../tools/db'
import { onError } from '../tools/utils'


app.post('/posts/:id', (req, res) => {

  const id = req.params.id

  db.hgetAsync('feed', id)
    .then(p => JSON.parse(p))
    .then(post => {
      const postWithReasons = Object.assign({}, post, {
        reasons1: post.reasons1 || [],
        reasons2: post.reasons2 || []
      })
      res.json(postWithReasons)
    })
    .catch(onError)
})
