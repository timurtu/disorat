/**
 * Created by timur on 11/14/16.
 */

import React from 'react'
import { Link } from 'react-router'

class Navbar extends React.Component {

  render() {

    return (
      <div style={{
        width: '100%',
        height: '3em',
        position: 'fixed',
        zIndex: 3,
        top: '0',
        left: '0',
        background: '#f7f7f7'
      }}>
        <nav className="ui secondary pointing menu">
          <Link to="/feed" className="item" activeClassName="active">
            Feed
          </Link>
          <Link to="/profile" className="item" activeClassName="active">
            Profile
          </Link>
          <div className="right menu">
            <Link to="/create" className="ui item" activeClassName="active">
              Create
            </Link>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
