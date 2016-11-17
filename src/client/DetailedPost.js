/**
 * Created by timur on 11/14/16.
 */

import 'whatwg-fetch'
import React from 'react'
import PieChart from 'react-simple-pie-chart'


const ProgressBar = ({ opt1votes, opt2votes }) =>
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

let reason1, reason2

class DetailedPost extends React.Component {

  componentWillMount() {
    this.setState({
      message: '404: Page not found!',
      reasons1: [],
      reasons2: []
    })
  }

  componentDidMount() {

    fetch(`/posts${location.pathname}`, { method: 'POST' })
      .then(res => res.json())
      .then(p => {
        const { id, title, option1, option2, option1votes, option2votes, reasons1, reasons2 } = JSON.parse(p)

        this.setState({
          id,
          title,
          option1,
          option2,
          option1votes,
          option2votes,
          reasons1: this.sortReasons(reasons1),
          reasons2: this.sortReasons(reasons2)
        })
      })
  }

  sortReasons(reasons) {
    return reasons.sort((a, b) => b.count - a.count)
  }

  handleReason1Change(e) {
    reason1 = e.target.value
  }

  handleReason2Change(e) {
    reason2 = e.target.value
  }

  render() {

    return (
      <div>
        <h1>{this.state.title}</h1>
        <div className="ui grid">
          <div className="eight wide column">
            <div className="ui segment">
              <h3>{this.state.option1}</h3>
              <h5>{this.state.option1votes} votes</h5>
              <button onClick={() => {
                fetch(`/posts/${this.state.id}/upvote1`, { method: 'POST' })
                  .then(res => res.json())
                  .then(post => {
                    this.setState({ option1votes: post.option1votes })
                  })
              }} className="fluid ui button colored teal">
                {this.state.option1}
              </button>

              <hr/>

              <form onSubmit={e => {

                e.preventDefault()

                if (reason1) {
                  fetch(`/reason/${this.state.id}/${reason1}/reason1`, { method: 'POST' })
                    .then(res => res.json())
                    .then(p => this.setState({ reasons1: this.sortReasons(p.reasons1) }))

                }
              }} className="ui mini form">
                <div className="field">
                  <label>Add a new reason</label>
                  <input onChange={this.handleReason1Change} placeholder={`Reason to vote for ${this.state.option1}`}
                         type="text"/>
                </div>
                <button className="ui tiny right floated submit button">Add reason</button>
              </form>

              <h5>Reasons</h5>

              <div className="ui list">
                {this.state.reasons1.map((r, i) =>
                  <a onClick={() => {
                    fetch(`/reason/${this.state.id}/${r.reason}/reason1`, { method: 'POST' })
                      .then(res => res.json())
                      .then(p => this.setState({ reasons1: this.sortReasons(p.reasons1) }))
                  }} className="item" key={i}>
                    <i className="plus icon"></i>
                    <div className="content">
                      <div className="header">{r.count}</div>
                      <div className="description">{r.reason}</div>
                    </div>
                  </a>)}
              </div>
            </div>
          </div>

          <div className="eight wide column">
            <div className="ui segment">
              <h3>{this.state.option2}</h3>
              <h5>{this.state.option2votes} votes</h5>
              <button onClick={() => {
                fetch(`/posts/${this.state.id}/upvote2`, { method: 'POST' })
                  .then(res => res.json())
                  .then(post => {
                    this.setState({ option2votes: post.option2votes })
                  })
              }} className="fluid ui button colored orange">
                {this.state.option2}
              </button>

              <hr/>

              <form onSubmit={e => {
                e.preventDefault()
                if (reason2) {
                  fetch(`/reason/${this.state.id}/${reason2}/reason2`, { method: 'POST' })
                    .then(res => res.json())
                    .then(p => this.setState({ reasons2: this.sortReasons(p.reasons2) }))
                }
              }} className="ui mini form">
                <div className="field">
                  <label>Add a new reason</label>
                  <input onChange={this.handleReason2Change} placeholder={`Reason to vote for ${this.state.option2}`}
                         type="text"/>
                </div>
                <button className="ui tiny right floated submit button">Add reason</button>
              </form>

              <h5>Reasons</h5>

              <div className="ui list">
                {this.state.reasons2.map((r, i) =>
                  <a onClick={() => {
                    fetch(`/reason/${this.state.id}/${r.reason}/reason2`, { method: 'POST' })
                      .then(res => res.json())
                      .then(p => this.setState({ reasons2: this.sortReasons(p.reasons2) }))
                  }} className="item" key={i}>
                    <i className="plus icon"></i>
                    <div className="content">
                      <div className="header">{r.count}</div>
                      <div className="description">{r.reason}</div>
                    </div>
                  </a>)}
              </div>

            </div>
          </div>
        </div>

        <hr/>

        <ProgressBar opt1votes={this.state.option1votes} opt2votes={this.state.option2votes}/>
      </div>
    )
  }
}

export default DetailedPost
