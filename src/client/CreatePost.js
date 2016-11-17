/**
 * Created by timur on 11/12/16.
 */

import React from 'react'
import { Link } from 'react-router'


$(function () {
  $('.dropdown').dropdown()
})

let title, option1, option2

class CreatePost extends React.Component {

  handleTitleChange(e) {
    title = e.target.value
  }

  handleOption1Change(e) {
    option1 = e.target.value
  }

  handleOption2Change(e) {
    option2 = e.target.value
  }

  createPost(e) {
    e.preventDefault()

    if (title && option1 && option2) {
      fetch(`/create?post=${JSON.stringify({ title, option1, option2 })}`, {
        method: 'POST'
      })
        .then(res => res.json())
        .then(p => {
          location.href = p.id
        })
        .catch(e => console.error(e))
    } else {
      alert('All fields are required')
    }
  }

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.createPost} className="ui form">
          <div className="required field">
            <label>Title</label>
            <input onChange={this.handleTitleChange} name="title" type="text" placeholder="Short Explanation"/>
          </div>
          <div className="two fields">
            <div className="required field">
              <label>Option 1</label>
              <input onChange={this.handleOption1Change} name="option1" type="text" placeholder="First Option"/>
            </div>
            <div className="required field">
              <label>Option 2</label>
              <input onChange={this.handleOption2Change} name="option2" type="text" placeholder="Second Option"/>
            </div>
          </div>
          <Link to="/" className="ui button">
            Cancel
          </Link>
          <button className="ui right floated color blue submit button">
            Create
          </button>
        </form>
      </div>
    )
  }
}

export default CreatePost
