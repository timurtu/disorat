/**
 * Created by timur on 11/12/16.
 */

import React from 'react'
import { Link } from 'react-router'


$(function () {
  $('.dropdown').dropdown()
})

let title

class CreatePost extends React.Component {

  onComponentDidMount() {
    this.setState({ title: '' })
  }

  handleTitleChange(e) {
    title = e.target.value
  }

  createPost(e) {
    e.preventDefault()
    if (title.length > 10) {

      console.log('title', title)
    } else {
      alert('Title must be above 10 characters')
    }
  }

  render() {
    return (
      <div className="ui segment">
        <form onSubmit={this.createPost} className="ui form">
          <div className="field">
            <label>Title</label>
            <input onChange={this.handleTitleChange} name="title" type="text" placeholder="Short Explanation"/>
          </div>
          <div className="two fields">
            <div className="required field">
              <label>Option 1</label>
              <input name="first" type="text" placeholder="First Option"/>
            </div>
            <div className="required field">
              <label>Option 2</label>
              <input type="text" placeholder="Second Option"/>
            </div>
          </div>
          <div className="required field">
            <label>How long will voting last until a winner is declared?</label>
            <div className="ui selection dropdown">
              <div className="default text">Select</div>
              <i className="dropdown icon"></i>
              <input type="hidden" name="gender"/>
              <div className="menu">
                <div className="item" value="forever">Forever</div>
                <div className="item" value="month">1 Month</div>
                <div className="item" value="week">1 Week</div>
                <div className="item" value="day">1 Day</div>
              </div>
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
