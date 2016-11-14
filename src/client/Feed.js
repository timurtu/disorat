/**
 * Created by timur on 11/12/16.
 */

import 'whatwg-fetch'
import React from 'react'
import { Link } from 'react-router'
import PieChart from 'react-simple-pie-chart'


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
      })
      .catch(e => console.error(e))
  }

  render() {
    return (
      <div className="ui cards">
        {this.state.posts.map(p => <Post post={p} key={p.id}/>)}
      </div>
    )
  }
}

const ProgressBar = ({opt1votes, opt2votes}) =>
  <div className="ui right floated" style={{ width: '3em' }}>
    <PieChart slices={
      [{
        color: '#00B5AD',
        value: opt1votes || 1,
      }, {
        color: '#F2711C',
        value: opt2votes || 1,
      }]
    }/>
  </div>

const Post = function ({ post }) {

  return (
    <div className="ui centered card">
      <Link to={`/${post.id}`} className="content">
        <div className="header">
          {post.title}
        </div>

        <ProgressBar opt1votes={post.option1votes} opt2votes={post.option2votes}/>
      </Link>

      <div className="extra content">
        <div className="ui two buttons">
          <button onClick={() => {
            fetch(`/posts/${post.id}/upvote1`, { method: 'POST'})
              .catch(e => console.error(e))
          }} className="ui teal button">{post.option1}</button>
          <button  onClick={() => {
            fetch(`/posts/${post.id}/upvote2`, { method: 'POST'})
              .catch(e => console.error(e))
          }} className="ui orange button">{post.option2}</button>
        </div>
      </div>
    </div>
  )
}
export default Feed
