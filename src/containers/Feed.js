/**
 * Created by timur on 11/12/16.
 */

import 'whatwg-fetch'
import React from 'react'
import { Link } from 'react-router'
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
            <Link to="/create" style={{
              position: 'fixed',
              right: '1em',
              bottom: '1em',
              zIndex: '4',
              boxShadow: '0 3px 5px rgba(0, 0, 0, .25)'
            }} className="massive circular ui color blue icon button">
              <i className="plus icon"/>
            </Link>
          </div>}
      </div>
    )
  }
}

export default Feed
