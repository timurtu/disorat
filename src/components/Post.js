/**
 * Created by timur on 11/21/16.
 */

import React from 'react'
import { Link } from 'react-router'
import { apiUrl } from '../globals'


export default class Post extends React.Component {

  componentWillMount() {

    const totalVotes = this.props.post.option1votes + this.props.post.option2votes

    this.setState({
      post: this.props.post,
      totalVotes
    })
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
            <Link to={`/votes/${this.props.post.id}`}>
              {this.props.post.title}
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
                fetch(`${apiUrl}/posts/${this.props.post.id}/upvote1`, { method: 'POST' })
                  .then(res => res.json())
                  .then(post => {
                    const totalVotes = this.state.totalVotes + 1
                    this.setState({ post, totalVotes })
                  })
              }} className="btn btn-info">
                {this.props.post.option1}
              </button>
            </div>

            <div className="btn-group" role="group">
              <button style={this.breakWord()} onClick={() => {
                fetch(`${apiUrl}/posts/${this.props.post.id}/upvote2`, { method: 'POST' })
                  .then(res => res.json())
                  .then(post => {
                    const totalVotes = this.state.totalVotes + 1
                    this.setState({ post, totalVotes })
                  })
              }} className="btn btn-warning">
                {this.props.post.option2}
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