/**
 * Created by timur on 11/14/16.
 */

import 'whatwg-fetch'
import React from 'react'
import Helmet from 'react-helmet'
import { apiUrl } from '../globals'


let reason1, reason2

export default class extends React.Component {

  componentWillMount() {
    this.setState({
      message: '404: Page not found!',
      reasons1: [],
      reasons2: [],
      loading: true,
      formattedDate: false
    })
  }

  breakWord() {
    return {
      overflowWrap: 'break-word'
    }
  }

  refresh() {

    window.scrollTo(0, 0)

    const path = location.pathname.split('votes')[1]

    fetch(`${apiUrl}/posts${path}`, { method: 'POST' })
      .then(res => res.json())
      .then(p => {
        const { id, title, option1, option2, option1votes, option2votes, reasons1, reasons2, date } = p

        const formattedDate = date ? new Date(date).toUTCString() : null

        this.setState({
          id,
          title,
          option1,
          option2,
          option1votes,
          option2votes,
          reasons1: this.sortReasons(reasons1),
          reasons2: this.sortReasons(reasons2),
          loading: false,
          date: formattedDate ? formattedDate : null
        })
      })
  }

  componentDidMount() {
    this.refresh()
  }

  componentWillReceiveProps() {
    this.refresh()
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

  maxWidth() {
    const maxWidth = `${window.innerWidth / 65}em`
    return { maxWidth }
  }

  someMargin() {
    return {
      margin: '1em 0'
    }
  }

  render() {

    return (
      <div>
        <Helmet
          title={`${this.state.title} | ${this.state.option1} vs ${this.state.option2}`}
        />

        <div style={this.breakWord()}>
          <h2>
            {this.state.title}
          </h2>

          <h3>
            {this.state.date}
          </h3>

          <div className="progress">
            <div className="progress-bar progress-bar-info" style={{
              width: `${this.state.option1votes / (this.state.option1votes + this.state.option2votes) * 100}%`
            }}>
              <span className="sr-only">20% Complete (warning)</span>
            </div>
            <div className="progress-bar progress-bar-warning" style={{
              width: `${this.state.option2votes / (this.state.option1votes + this.state.option2votes) * 100}%`
            }}>
              <span className="sr-only">10% Complete (danger)</span>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="panel panel-info">
                <div className="panel-heading">
                  <div className="panel-title">{this.state.option1}</div>
                </div>
                <div className="panel-body">
                  <h5>{this.state.option1votes} votes</h5>

                  <button
                    style={this.someMargin()}
                    className="btn btn-info btn-block"
                    onClick={() => {
                      fetch(`${apiUrl}/posts/${this.state.id}/upvote1`, { method: 'POST' })
                        .then(res => res.json())
                        .then(post => {
                          this.setState({ option1votes: post.option1votes })
                        })
                    }}>
                    Vote for {this.state.option1}
                  </button>

                  <form onSubmit={e => {
                    e.preventDefault()

                    if (reason1) {
                      fetch(`${apiUrl}/reason/${this.state.id}/${reason1}/reason1`, { method: 'POST' })
                        .then(res => res.json())
                        .then(p => this.setState({ reasons1: this.sortReasons(p.reasons1) }))
                    }
                  }}>

                    <input
                      style={this.someMargin()}
                      className="form-control"
                      onChange={this.handleReason1Change}
                      placeholder={`Reason to vote for ${this.state.option1}`}
                      type="text"
                    />

                    <button
                      style={this.someMargin()}
                      className="btn btn-default btn-block">
                      Add reason
                    </button>
                  </form>

                  <h5>Reasons</h5>

                  <div>
                    {this.state.reasons1.map((r, i) =>
                      <a
                        style={{
                          userSelect: 'none'
                        }}
                        role="button"
                        className="list-group-item"
                        key={i}
                        onClick={() => {
                          fetch(`${apiUrl}/reason/${this.state.id}/${r.reason}/reason1`, { method: 'POST' })
                            .then(res => res.json())
                            .then(p => this.setState({ reasons1: this.sortReasons(p.reasons1) }))
                        }}
                      >
                        <span className="badge">{r.count}</span>
                        {r.reason}
                      </a>)}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="panel panel-warning">
                <div className="panel-heading">
                  <div className="panel-title">
                    {this.state.option2}
                  </div>
                </div>

                <div className="panel-body">
                  <p>{this.state.option2votes} votes</p>

                  <button
                    style={this.someMargin()}
                    className="btn btn-warning btn-block"
                    onClick={() => {
                      fetch(`${apiUrl}/posts/${this.state.id}/upvote2`, { method: 'POST' })
                        .then(res => res.json())
                        .then(post => {
                          this.setState({ option2votes: post.option2votes })
                        })
                    }}>
                    Vote for {this.state.option2}
                  </button>

                  <form onSubmit={e => {
                    e.preventDefault()

                    if (reason2) {
                      fetch(`${apiUrl}/reason/${this.state.id}/${reason2}/reason2`, { method: 'POST' })
                        .then(res => res.json())
                        .then(p => this.setState({ reasons2: this.sortReasons(p.reasons2) }))
                    }
                  }}>
                    <input
                      style={this.someMargin()}
                      className="form-control"
                      onChange={this.handleReason2Change}
                      placeholder={`Reason to vote for ${this.state.option2}`}
                      type="text"
                    />

                    <button
                      style={this.someMargin()}
                      className="btn btn-default btn-block">
                      Add reason
                    </button>
                  </form>

                  <h5>Reasons</h5>

                  <div className="list-group">
                    {this.state.reasons2.map((r, i) =>
                      <a
                        style={{
                          userSelect: 'none'
                        }}
                        role="button"
                        key={i}
                        className="list-group-item"
                        onClick={() => {
                          fetch(`${apiUrl}/reason/${this.state.id}/${r.reason}/reason2`, { method: 'POST' })
                            .then(res => res.json())
                            .then(p => this.setState({ reasons2: this.sortReasons(p.reasons2) }))
                        }}
                      >
                        <span className="badge">{r.count}</span>
                        {r.reason}
                      </a>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
