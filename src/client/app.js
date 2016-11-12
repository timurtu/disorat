/**
 * Created by timur on 11/11/16.
 */

import 'whatwg-fetch'
import dom from 'domali'
import $ from 'jquery'


const getPosts = () => $.get('/posts', createPosts)
const ul = dom.getClass('post-list')[0]

dom.getId('get-posts').onclick = getPosts
getPosts()

function createPosts(blocks) {

  const tempUL = dom.create('ul')

  blocks.forEach(b => {
    tempUL.appendChild(dom.create('li').text(b))
  })

  ul.innerHTML = tempUL.innerHTML
}
