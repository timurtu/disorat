/**
 * Created by timur on 11/12/16.
 */

import 'whatwg-fetch'
import React from 'react'


$(function () {
  $('.progress-bar').progress('increment')
})


class Posts extends React.Component {

  componentWillMount() {
    this.setState({posts: []})
  }

  componentDidMount() {
    fetch('/posts')
      .then(res => res.json())
      .then(posts => {
        this.setState({posts})
      })
      .catch(e => console.error(e))
  }

  render() {
    return (
      <div className="ui cards">
        {this.state.posts.map((p, i) => <Post title={p} id={i} key={i}/>)}
      </div>
    )
  }
}

const Post = ({title, id}) =>
  <div className="ui centered card">

    <div className="ui teal top attached progress">
      <div className="bar"></div>
    </div>

    <div className="ui tiny orange bottom attached progress">
      <div className="bar"></div>
    </div>

    <div className="content">
      <div className="header">
        {title}
      </div>

      <div className="meta">
        Ends in 9 days
      </div>
    </div>

    <div className="extra content">
      <div className="ui two buttons">
        <div className="ui teal button">T-Rex</div>
        <div className="ui orange button">Abraham Lincoln</div>
      </div>
    </div>
  </div>


export default Posts
