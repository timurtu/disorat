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

  componentWillMount() {
    this.setState({ error: '' })
  }

  componentDidMount() {
    const docTitle = document.querySelector('title')
    docTitle.textContent = 'disorat | Create a Vote'
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

  createPost(e) {
    e.preventDefault()

    if (title && option1 && option2) {

      const post = JSON.stringify({ title, option1, option2 })

      fetch(`/create?post=${post}`, {
        method: 'POST'
      })
        .then(res => res.json())
        .then(p => {
          location.href = p.id
        })
        .catch(e => console.error(e))
    } else {
      $('.ui.basic.modal').modal('show')
    }
  }

  render() {
    return (
      <div className="ui inverted segment">
        <h1>Create a New Vote</h1>
        <form onSubmit={this.createPost} className="ui inverted form">
          <div className="required field">
            <label>Title</label>
            <input onChange={this.handleTitleChange} name="title" type="text" placeholder="What are we voting on?"/>
          </div>

          <div className="two fields">
            <div className="required field">
              <label style={{ color: '#00B5AD' }}>Option 1</label>
              <input onChange={this.handleOption1Change} name="option1" type="text" placeholder="First option"/>
            </div>

            <div className="required field">
              <label style={{ color: '#F2711C' }}>Option 2</label>
              <input onChange={this.handleOption2Change} name="option2" type="text" placeholder="Second option"/>
            </div>
          </div>

          <Link to="/" className="ui large inverted button">
            Cancel
          </Link>

          <button className="ui large right floated inverted color blue submit button">
            Create
          </button>
        </form>
        <div className="ui basic modal">
          <i className="close icon"></i>
          <div className="header">
            All fields are required.
          </div>
          <div className="image content">
            <div className="image">
              <i className="archive icon"></i>
            </div>
            <div className="description">
              <p>Fill out every field in order to create a new vote.</p>
            </div>
          </div>
          <div className="actions">
            <div className="two fluid ui inverted buttons">
              <Link to="/" className="ui cancel red basic inverted button">
                <i className="remove icon"></i>
                Cancel
              </Link>
              <div className="ui cancel green basic inverted button">
                <i className="checkmark icon"></i>
                Okay
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreatePost
