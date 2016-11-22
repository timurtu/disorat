/**
 * Created by timur on 11/12/16.
 */

import 'whatwg-fetch'
import React from 'react'
import { Link } from 'react-router'
import PieChart from 'react-simple-pie-chart'
import LazyLoad from 'react-lazyload'
import ReactGA from 'react-ga'


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
      <div>
        <div className="ui one cards">
          {this.state.posts.map((p, i) =>
            <LazyLoad key={i} height={170}>
              <Post post={p}/>
            </LazyLoad>)}
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

const ProgressBar = ({ opt1votes, opt2votes }) =>
  <div className="ui right floated" style={{ width: '5em' }}>
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

  inverted() {
    return {
      color: 'rgba(255,255,261,.9)'
    }
  }

  render() {

    return (
      <div className="card" style={{
        backgroundColor: '#1B1C1D',
        border: '1px solid #1B1C1D',
        boxShadow: '0 1px 3px rgba(0,0,0, 0.25)'
      }}>
        <Link to={`/${this.state.post.id}`} className="content">
          <div style={this.inverted()} className="header">
            {this.state.post.title}
          </div>

          <div style={this.inverted()} className="meta">
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
                  ReactGA.event({
                    category: 'Vote',
                    action: `Voted for ${this.state.post.option1}`,
                    label: 'Homepage Thing'
                  })
                  this.setState({ post, totalVotes })
                })
                .catch(e => console.error(e))
            }} className="ui inverted teal button">{this.state.post.option1}</button>
            <button onClick={() => {
              fetch(`/posts/${this.state.post.id}/upvote2`, { method: 'POST' })
                .then(res => res.json())
                .then(post => {
                  const totalVotes = this.state.totalVotes + 1
                  this.setState({ post, totalVotes })
                })
                .catch(e => console.error(e))
            }} className="ui inverted orange button">{this.state.post.option2}</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Feed
