/**
 * Created by timur on 11/11/16.
 */

import 'whatwg-fetch'
import {el} from 'psydux'
import $ from 'jquery'

const li = x => el('li', {}, () => x)
const ul = lis => el('ul', {}, () => lis.map(li))

const getPosts = () => fetch('/posts')
  .then(res => res.json())
  .then(body => createPost(body))
  .catch((e) => console.error('parsing failed', e))

el('button', {}, () => 'Get Posts').onclick = getPosts
getPosts()

let list = ul(['standard', 'default', 'list'])

function createPost(blocks) {

  list = blocks.map(li)
}
