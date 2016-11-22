/**
 * Created by timur on 11/21/16.
 */

import app from '../app'
import db from '../tools/db'
import { onError } from '../tools/utils'


const sortByVotes = (x, y) => {
  const total1 = x.option1votes + x.option2votes
  const total2 = y.option1votes + y.option2votes

  return total2 - total1
}

app.post('/posts', (req, res) => {

  db.hgetallAsync('feed')
    .then(postsMap => {

      const posts = []

      for (let id in postsMap) {
        posts.push(JSON.parse(postsMap[id]))
      }

      const sortedPosts = posts.sort(sortByVotes)

      res.json(sortedPosts)
    })
    .catch(onError)
})
