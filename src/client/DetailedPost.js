/**
 * Created by timur on 11/14/16.
 */

import 'whatwg-fetch'
import React from 'react'

class DetailedPost extends React.Component {

  componentWillMount() {

    const title = this.props.params.title

    fetch(`/posts/${title}`, {method: 'POST'})
      .then(res => res.json())
      .then(post => {
        this.setState({ title })
      })
      .catch(e => this.setState({title: '404: Page not found!'}))

  }

  render() {
    return(
      <div>
        <h1>{this.state.title}</h1>
      </div>
    )
  }
}

export default DetailedPost
