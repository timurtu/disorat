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
        const posts = ps.map(p => p.startsWith('{') ? JSON.parse(p) : p)
        this.setState({ posts })
      })
      .catch(e => console.error(e))
  }

  render() {
    return (
      <div className="ui cards">
        {this.state.posts.map((p, i) => <Post title={p} key={i}/>)}
      </div>
    )
  }
}

const ProgressBar = () =>
  <div className="ui right floated" style={{ width: '3em' }}>
    <PieChart slices={
      [{
        color: '#00B5AD',
        value: 70,
      }, {
        color: '#F2711C',
        value: 30,
      }]
    }/>
  </div>

const Post = function ({ post }) {

  return (
    <div className="ui centered card">
      <Link to={`/${post}`} className="content">
        <div className="header">
          {post.title}
        </div>

        <ProgressBar/>

        <div className="meta">
          Ends in 9 days
        </div>
      </Link>

      <div className="extra content">
        <div className="ui two buttons">
          <div className="ui teal button">T-Rex</div>
          <div className="ui orange button">Abraham Lincoln</div>
        </div>
      </div>
    </div>
  )
}
export default Feed
