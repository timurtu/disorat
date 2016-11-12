/**
 * Created by timur on 11/12/16.
 */

import 'whatwg-fetch'
import React from 'react'


class Posts extends React.Component {

  componentDidMount() {
    fetch('/posts')
      .then(res => res.json())
      .then(p => console.log(p))
  }

  render() {
    return(
      <div>
        <ul>
          <li>hey</li>
          <li>there</li>
          <li>what</li>
        </ul>
      </div>
    )
  }

}

export default Posts
