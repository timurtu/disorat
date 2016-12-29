/**
 * Created by timur on 11/12/16.
 */

import 'whatwg-fetch'
import React from 'react'
import LazyLoad from 'react-lazyload'
import Helmet from 'react-helmet'
import Post from '../components/Post'
import Loading from '../components/Loading'
import { apiUrl } from '../globals'

class Feed extends React.Component {

  componentWillMount() {
    this.setState({
      posts: [],
      loading: true
    })
  }

  componentDidMount() {
    fetch(`${apiUrl}/posts`, { method: 'POST' })
      .then(res => res.json())
      .then(posts => {
        this.setState({
          posts,
          loading: false
        })
      })
  }

  render() {
    return (
      <div>
        <Helmet title="Feed"/>
        {this.state.loading ? <Loading/> :
          <div>
            <div className="ui one cards">
              {this.state.posts.map((p, i) =>
                <LazyLoad key={i} height={170}>
                  <Post post={p}/>
                </LazyLoad>
              )}
            </div>
          </div>}
      </div>
    )
  }
}

export default Feed
