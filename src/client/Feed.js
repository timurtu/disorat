/**
 * Created by timur on 11/12/16.
 */

import 'whatwg-fetch'
import React from 'react'
import { Link } from 'react-router'
import PieChart from 'react-simple-pie-chart'
import LazyLoad from 'react-lazyload'


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

  render() {
    return (
      <div className="ui cards">
        {this.state.posts.map(p =>
          <LazyLoad key={p.id} height={170}>
            <Post post={p}/>
          </LazyLoad>)}
      </div>
    )
  }
}

const ProgressBar = ({ opt1votes, opt2votes }) =>
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

class Post extends React.Component {

  componentWillMount() {

    const post = this.props.post
    const totalVotes = post.option1votes + post.option2votes

    this.setState({ post, totalVotes })
  }


  render() {

    return (
      <div className="ui centered card">
        <Link to={`/${this.state.post.id}`} className="content">
          <div className="header">
            {this.state.post.title}
          </div>

          <div className="meta">
            {this.state.totalVotes} votes
          </div>

          <ProgressBar opt1votes={this.state.post.option1votes} opt2votes={this.state.post.option2votes}/>
        </Link>

        <div className="extra content">
          <div className="ui two buttons">
            <button onClick={() => {
              fetch(`/posts/${this.state.post.id}/upvote1`, { method: 'POST' })
                .then(res => res.json())
                .then(post => {
                  const totalVotes = this.state.totalVotes + 1
                  this.setState({ post, totalVotes })
                })
                .catch(e => console.error(e))
            }} className="ui teal button">{this.state.post.option1}</button>
            <button onClick={() => {
              fetch(`/posts/${this.state.post.id}/upvote2`, { method: 'POST' })
                .then(res => res.json())
                .then(post => {
                  const totalVotes = this.state.totalVotes + 1
                  this.setState({ post, totalVotes })
                })
                .catch(e => console.error(e))
            }} className="ui orange button">{this.state.post.option2}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Feed
