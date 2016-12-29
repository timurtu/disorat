/**
 * Created by timur on 11/12/16.
 */

import React from 'react'
import { Link } from 'react-router'
import Helmet from 'react-helmet'
import { apiUrl } from '../globals'

let title, option1, option2

class CreatePost extends React.Component {

  componentWillMount() {
    this.setState({ error: '' })
  }

  handleTitleChange(e) {
    title = e.target.value
  }

  handleOption1Change(e) {
    option1 = e.target.value
  }

  handleOption2Change(e) {
    option2 = e.target.value
  }

  someMargin() {
    return {
      margin: '1em 0'
    }
  }

  createPost(e) {
    e.preventDefault()

    if (title && option1 && option2) {

      const post = JSON.stringify({ title, option1, option2 })

      fetch(`${apiUrl}/create?post=${post}`, {
        method: 'POST'
      })
        .then(res => res.json())
        .then(p => {
          location.href = `/votes/${p.id}`
        })
    } else {
      alert('All fields are required.')
    }
  }

  render() {
    return (
      <div className="ui inverted segment">

        <Helmet title="Create a Vote"/>

        <div className="panel panel-primary">
          <div className="panel-heading">
            <div className="panel-title">
              Create a New Vote
            </div>
          </div>

          <div className="panel-body">
            <form onSubmit={this.createPost} className="ui inverted form">
              <div className="required field">
                <label style={this.someMargin()}>Title</label>
                <input
                  className="form-control"
                  onChange={this.handleTitleChange}
                  name="title"
                  type="text"
                  placeholder="What are we voting on?"
                />
              </div>

              <label style={Object.assign({}, this.someMargin(), {
                color: '#00B5AD'
              })}>Option 1</label>
              <input
                className="form-control"
                onChange={this.handleOption1Change}
                name="option1"
                type="text"
                placeholder="First option"
              />

              <label style={Object.assign({}, this.someMargin(), {
                color: '#F2711C'
              })}>Option 2</label>
              <input
                className="form-control"
                onChange={this.handleOption2Change}
                name="option2"
                type="text"
                placeholder="Second option"
              />

              <div style={{
                margin: '2em 1em 0'
              }}>
                <Link to="/" className="btn btn-default">
                  Cancel
                </Link>

                <button className="btn btn-primary pull-right">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default CreatePost
