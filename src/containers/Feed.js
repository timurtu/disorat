/**
 * Created by timur on 11/12/16.
 */

import 'whatwg-fetch'
import React from 'react'
import LazyLoad from 'react-lazyload'
import Helmet from 'react-helmet'
import Post from '../components/Post'
import { apiUrl } from '../globals'

class Feed extends React.Component {

  constructor() {
    super()
    this.state = {
      posts: []
    }
  }

  componentWillMount() {
    this.fetchPosts()
    setInterval(() => this.fetchPosts(), 5000)
  }

  fetchPosts() {
    fetch(`${apiUrl}/posts`, { method: 'POST' })
      .then(res => res.json())
      .then(posts => {
        this.setState({
          posts
        })
      })
  }

  render() {
    return (
      <div>
        <Helmet title="Feed"/>

        {this.state.posts.map((post, i) =>
          <LazyLoad key={i} height={170}>
            <Post post={post}/>
          </LazyLoad>
        )}
      </div>
    )
  }
}

export default Feed
