/**
 * Created by timur on 12/28/16.
 */

import React from 'react'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      path: ''
    }
  }

  componentWillMount() {
    this.setState({
      path: location.pathname
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>404</h1>
          <p>Requested page <strong>{this.state.path}</strong> does not exist.</p>
        </div>
      </div>
    )
  }
}