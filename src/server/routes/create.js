/**
 * Created by timur on 11/21/16.
 */

import log from 'gutil-color-log'
import app from '../app'
import db from '../tools/db'
import { onError } from '../tools/utils'


app.post('/create', (req, res) => {

  const id = Math.floor(Math.random() * Date.now())
  const post = Object.assign({}, JSON.parse(req.query.post), {
    id,
    option1votes: 0,
    option2votes: 0,
    reasons1: [],
    reasons2: [],
    date: Date.now()
  })

  db.hsetAsync('feed', id, JSON.stringify(post))
    .then(p => {
      log('green', p)
    })
    .catch(onError)

  res.json(post)
})