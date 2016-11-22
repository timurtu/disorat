/**
 * Created by timur on 11/21/16.
 */

import app from '../app'
import db from '../tools/db'
import { onError } from '../tools/utils'


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
