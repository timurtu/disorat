/**
 * Created by timur on 11/11/16.
 */

import 'whatwg-fetch'
import dom from 'domali'
import $ from 'jquery'


const getPosts = () => $.get('/posts', createPost)
const ul = dom.getClass('post-list')[0]

dom.getId('get-posts').onclick = getPosts
getPosts()

function createPost(blocks) {

  ul.innerHTML = blocks.map(b => dom.create('li').text(b))
}
