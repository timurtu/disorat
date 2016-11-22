/**
 * Created by timur on 11/21/16.
 */

import app from '../app'
import db from '../tools/db'
import { onError } from '../tools/utils'


app.post('/posts', (req, res) => {
  db.lrangeAsync('posts', 0, -1)
    .then(posts => {

      const sortedPosts = posts.sort(function (x, y) {

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
