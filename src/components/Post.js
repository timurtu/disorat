/**
 * Created by timur on 11/21/16.
 */

import React from 'react'
import { Link } from 'react-router'
import ReactGA from 'react-ga'
import { apiUrl } from '../globals'


export default class Post extends React.Component {

  componentWillMount() {

    const post = this.props.post
    const totalVotes = post.option1votes + post.option2votes

    this.setState({ post, totalVotes })
  }

  breakWord() {
    return {
      overflowWrap: 'break-word',
      whiteSpace: 'normal'
    }
  }

  render() {
    return (
      <div className="panel panel-primary">
        <div style={this.breakWord()} className="panel-heading">
          <div className="panel-title">
            <Link to={`/votes/${this.state.post.id}`}>
              {this.state.post.title}
            </Link>
          </div>
        </div>

        <div className="panel-body">

          <div className="progress">
            <div className="progress-bar progress-bar-info" style={{
              width: `${this.state.post.option1votes / this.state.totalVotes * 100}%`
            }}>
              <span className="sr-only">20% Complete (warning)</span>
            </div>
            <div className="progress-bar progress-bar-warning" style={{
              width: `${this.state.post.option2votes / this.state.totalVotes * 100}%`
            }}>
              <span className="sr-only">10% Complete (danger)</span>
            </div>
          </div>

          <div className="btn-group btn-group-justified" role="group">

            <div className="btn-group" role="group">
              <button style={this.breakWord()} onClick={() => {
                fetch(`${apiUrl}/posts/${this.state.post.id}/upvote1`, { method: 'POST' })
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
              }} className="btn btn-info">
                {this.state.post.option1}
              </button>
            </div>

            <div className="btn-group" role="group">
              <button style={this.breakWord()} onClick={() => {
                fetch(`${apiUrl}/posts/${this.state.post.id}/upvote2`, { method: 'POST' })
                  .then(res => res.json())
                  .then(post => {
                    const totalVotes = this.state.totalVotes + 1
                    this.setState({ post, totalVotes })
                  })
              }} className="btn btn-warning">
                {this.state.post.option2}
              </button>
            </div>
          </div>
        </div>

        <div className="panel-footer">
          {this.state.totalVotes} votes
        </div>
      </div>
    )
  }
}