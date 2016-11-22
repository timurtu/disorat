/**
 * Created by timur on 11/12/16.
 */

import 'whatwg-fetch'
import React from 'react'
import { Link } from 'react-router'
import LazyLoad from 'react-lazyload'
import Post from './Post'


class Feed extends React.Component {

  componentWillMount() {
    this.setState({ posts: [] })
  }

  componentDidMount() {
    fetch('/posts', { method: 'POST' })
      .then(res => res.json())
      .then(ps => {
        const posts = ps.map(p => JSON.parse(p))
        this.setState({ posts })

        const docTitle = document.querySelector('title')
        docTitle.textContent = 'disorat | Vote on Anything'
      })
      .catch(e => console.error(e))
  }

  posts() {
    return this.state.posts.map((p, i) => {
      if (i % 3 === 0) {
        return (
          <LazyLoad key={i} height={170}>
            <Post ad={true} post={p}/>
          </LazyLoad>
        )
      } else {
        return (
          <LazyLoad key={i} height={170}>
            <Post ad={false} post={p}/>
          </LazyLoad>
        )
      }
    })
  }

  render() {
    return (
      <div>
        <div className="ui one cards">
          {this.posts()}
        </div>

        <Link to="/create" style={{
          position: 'fixed',
          right: '1em',
          bottom: '2em',
          zIndex: '4',
          boxShadow: '0 3px 5px rgba(0, 0, 0, .25)'
        }} className="massive circular ui inverted color blue icon button">
          <i className="plus icon"></i>
        </Link>
      </div>
    )
  }
}

export default Feed
