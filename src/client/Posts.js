/**
 * Created by timur on 11/12/16.
 */

import 'whatwg-fetch'
import React from 'react'


class Posts extends React.Component {

  componentWillMount() {
    this.setState({ posts: [] })
  }

  componentDidMount() {
    fetch('/posts', { method: 'POST' })
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts })
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

const ProgressBar = () =>
  <div>
    <div className="ui progress">
      <div className="bar">
        <div className="progress"></div>
      </div>
      <div className="label">Uploading Files</div>
    </div>
  </div>

const Post = ({ title, id }) =>
  <div className="ui centered card">


    <div className="content">
      <div className="header">
        {title}
      </div>

      <div className="meta">
        Ends in 9 days
      </div>
    </div>

    <ProgressBar/>


    <div className="extra content">
      <div className="ui two buttons">
        <div className="ui teal button">T-Rex</div>
        <div className="ui orange button">Abraham Lincoln</div>
      </div>
    </div>
  </div>

export default Posts
