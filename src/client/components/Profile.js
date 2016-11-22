/**
 * Created by timur on 11/14/16.
 */

import React from 'react'
import { Link } from 'react-router'


class Profile extends React.Component {

  componentWillMount() {
    this.setState({
      route: 'profile',
      loggedIn: false
    })
  }

  loggedInDescriber() {
    let page
    if (this.state.loggedIn) {
      page =
        <div>
          <h1>{this.state.user.name}</h1>
        </div>
    } else {
      page =
        <div>
          <h1>Login with Facebook</h1>
          <Link to="/" className="ui button">Cancel</Link>
          <button onClick={() => {
            fetch('/login', { method: 'POST' })
              .then(res => res.json())
              .then(user => this.setState({ user, loggedIn: true }))
          }} className="ui button right floated color blue">Login
          </button>
        </div>
    }
    return page
  }

  render() {
    return this.loggedInDescriber()
  }
}

export default Profile
