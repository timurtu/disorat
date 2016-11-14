/**
 * Created by timur on 11/14/16.
 */

import 'whatwg-fetch'
import React from 'react'
import PieChart from 'react-simple-pie-chart'


const ProgressBar = ({opt1votes, opt2votes}) =>
  <div style={{
    maxWidth: '50%',
    margin: '0 auto'
  }}>
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

class DetailedPost extends React.Component {

  componentWillMount() {
    this.setState({ message: '404: Page not found!' })
  }

  componentDidMount() {

    fetch(`/posts${location.pathname}`, { method: 'POST' })
      .then(res => res.json())
      .then(p => {
        const { id, title, option1, option2, option1votes, option2votes } = JSON.parse(p)

        this.setState({
          id,
          title,
          option1,
          option2,
          option1votes,
          option2votes
        })
      })
  }

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>

        <div className="ui horizontal segments">
          <div className="ui segment">
            <h3>{this.state.option1}</h3>
            <h5>{this.state.option1votes} votes</h5>
            <button onClick={() => {
              fetch(`/posts/${this.state.id}/upvote1`, { method: 'POST'})
                .then(res => res.json())
                .then(post => {
                  this.setState({option1votes: post.option1votes})
                })
            }} className="fluid ui button colored teal">
              {this.state.option1}
            </button>
          </div>

          <div className="ui segment">
            <h3>{this.state.option2}</h3>
            <h5>{this.state.option2votes} votes</h5>
            <button onClick={() => {
              fetch(`/posts/${this.state.id}/upvote2`, { method: 'POST'})
                .then(res => res.json())
                .then(post => {
                  this.setState({option2votes: post.option2votes})
                })
            }} className="fluid ui button colored orange">
              {this.state.option2}
            </button>
          </div>
        </div>

        <ProgressBar opt1votes={this.state.option1votes} opt2votes={this.state.option2votes}/>
      </div>
    )
  }
}

export default DetailedPost
