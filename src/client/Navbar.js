/**
 * Created by timur on 11/14/16.
 */

import React from 'react'
import { Link } from 'react-router'


const Navbar = () =>
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
      <Link to="/" className="item active">
        Home
      </Link>
      <Link to="/profile" className="item">
        Profile
      </Link>
      <div className="right menu">
        <Link to="/create" className="ui item">
          Create
        </Link>
      </div>
    </nav>
  </div>

export default Navbar
