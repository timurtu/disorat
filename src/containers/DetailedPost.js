/**
 * Created by timur on 11/14/16.
 */

import 'whatwg-fetch'
import React from 'react'
import Helmet from 'react-helmet'
import PieChart from 'react-simple-pie-chart'
import Loading from '../components/Loading'
import { apiUrl } from '../globals'

const ProgressBar = ({ opt1votes, opt2votes }) =>
  <div style={{
    maxWidth: '50%',
    margin: '0 auto'
  }}>
    <PieChart slices={[{
      color: '#00B5AD',
      value: opt1votes || 1,
    }, {
      color: '#F2711C',
      value: opt2votes || 1,
    }]}/>
  </div>

let reason1, reason2

class DetailedPost extends React.Component {

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

  render() {

    return (
      <div>
        <Helmet
          title={`${this.state.title} | ${this.state.option1} vs ${this.state.option2}`}
        />
        {this.state.loading ? <Loading/> :
          <div style={this.breakWord()}>
            <h1>{this.state.title}</h1>

            <h3>{this.state.date}</h3>

            <div className="ui grid">
              <div className="eight wide column">
                <div className="ui inverted segment">
                  <h3>{this.state.option1}</h3>
                  <h5>{this.state.option1votes} votes</h5>
                  <button onClick={() => {
                    fetch(`${apiUrl}/posts/${this.state.id}/upvote1`, { method: 'POST' })
                      .then(res => res.json())
                      .then(post => {
                        this.setState({ option1votes: post.option1votes })
                      })
                  }} className="fluid ui inverted button colored teal">
                    {this.state.option1}
                  </button>

                  <form onSubmit={e => {

                    e.preventDefault()

                    if (reason1) {
                      fetch(`${apiUrl}/reason/${this.state.id}/${reason1}/reason1`, { method: 'POST' })
                        .then(res => res.json())
                        .then(p => this.setState({ reasons1: this.sortReasons(p.reasons1) }))
                    }
                  }} className="ui inverted form">
                    <div className="field">
                      <label>Add a new reason</label>
                      <input onChange={this.handleReason1Change}
                             placeholder={`Reason to vote for ${this.state.option1}`}
                             type="text"/>
                    </div>
                    <button className="ui inverted tiny right floated submit button">Add reason</button>
                  </form>

                  <div className="ui hidden divider"></div>
                  <div className="ui hidden divider"></div>

                  <h5>Reasons</h5>

                  <div className="ui inverted list">
                    {this.state.reasons1.map((r, i) =>
                      <a onClick={() => {
                        fetch(`${apiUrl}/reason/${this.state.id}/${r.reason}/reason1`, { method: 'POST' })
                          .then(res => res.json())
                          .then(p => this.setState({ reasons1: this.sortReasons(p.reasons1) }))
                      }} className="item" key={i}>
                        <i className="plus icon"/>
                        <div className="content">
                          <div style={this.maxWidth()} className="header">{r.count}</div>
                          <div style={this.maxWidth()} className="description">{r.reason}</div>
                        </div>
                      </a>)}
                  </div>
                </div>
              </div>

              <div className="eight wide column">
                <div className="ui inverted segment">
                  <h3>{this.state.option2}</h3>
                  <h5>{this.state.option2votes} votes</h5>
                  <button onClick={() => {
                    fetch(`${apiUrl}/posts/${this.state.id}/upvote2`, { method: 'POST' })
                      .then(res => res.json())
                      .then(post => {
                        this.setState({ option2votes: post.option2votes })
                      })
                  }} className="fluid ui inverted button colored orange">
                    {this.state.option2}
                  </button>

                  <form onSubmit={e => {
                    e.preventDefault()
                    if (reason2) {
                      fetch(`${apiUrl}/reason/${this.state.id}/${reason2}/reason2`, { method: 'POST' })
                        .then(res => res.json())
                        .then(p => this.setState({ reasons2: this.sortReasons(p.reasons2) }))
                    }
                  }} className="ui inverted form">
                    <div className="field">
                      <label>Add a new reason</label>
                      <input onChange={this.handleReason2Change}
                             placeholder={`Reason to vote for ${this.state.option2}`}
                             type="text"/>
                    </div>
                    <button className="ui inverted tiny right floated submit button">Add reason</button>
                  </form>

                  <div className="ui hidden divider"></div>
                  <div className="ui hidden divider"></div>

                  <h5>Reasons</h5>

                  <div className="ui inverted list">
                    {this.state.reasons2.map((r, i) =>
                      <a onClick={() => {
                        fetch(`${apiUrl}/reason/${this.state.id}/${r.reason}/reason2`, { method: 'POST' })
                          .then(res => res.json())
                          .then(p => this.setState({ reasons2: this.sortReasons(p.reasons2) }))
                      }} className="item" key={i}>
                        <i className="plus icon"/>
                        <div className="content">
                          <div style={this.maxWidth()} className="header">{r.count}</div>
                          <div style={this.maxWidth()} className="description">{r.reason}</div>
                        </div>
                      </a>)}
                  </div>

                </div>
              </div>
            </div>

            <div className="ui hidden divider"></div>

            <ProgressBar opt1votes={this.state.option1votes} opt2votes={this.state.option2votes}/>
          </div>
        }
      </div>
    )
  }
}

export default DetailedPost
