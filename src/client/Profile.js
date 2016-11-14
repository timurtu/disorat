/**
 * Created by timur on 11/14/16.
 */

import React from 'react'
import { Link } from 'react-router'


class Profile extends React.Component {

  componentWillMount() {
    this.setState({ route: 'profile' })
  }

  render() {

    return (
      <div>
        <h1>Login with Facebook</h1>
        <Link to="/" className="ui button">Cancel</Link>
        <button className="ui button right floated color blue">Login</button>
      </div>
    )
  }
}

export default Profile
