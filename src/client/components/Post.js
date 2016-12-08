/**
 * Created by timur on 11/21/16.
 */

import React from 'react'
import { Link } from 'react-router'
import PieChart from 'react-simple-pie-chart'
import ReactGA from 'react-ga'
import Ad from './Ad'


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

export default class Post extends React.Component {

  componentWillMount() {

    const post = this.props.post
    const totalVotes = post.option1votes + post.option2votes

    this.setState({ post, totalVotes })
  }

  inverted() {
    return {
      color: 'rgba(255,255,261,.9)',
      overflowWrap: 'break-word'
    }
  }

  breakWord() {
    return {
      overflowWrap: 'break-word'
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

          <div style={{
            marginTop: '1em',
            fontSize: '1.125em'
          }}>View more info</div>

          <ProgressBar opt1votes={this.state.post.option1votes} opt2votes={this.state.post.option2votes}/>
        </Link>

        {this.props.ad ? <Ad/> : null}

        <div className="extra content">
          <div style={this.breakWord()} className="ui two buttons">
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