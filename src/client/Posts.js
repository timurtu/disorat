/**
 * Created by timur on 11/12/16.
 */

import 'whatwg-fetch'
import React from 'react'


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
      <div>
        <ul className="ui list">
          {this.state.posts.map((p, i) => <li className="item" key={i}>{p}</li>)}
        </ul>
      </div>
    )
  }
}

export default Posts
