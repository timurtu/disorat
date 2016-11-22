/**
 * Created by timur on 11/14/16.
 */

import React from 'react'
import { Link } from 'react-router'

class Navbar extends React.Component {

  render() {

    return (
      <div>
        <div style={{
          width: '100%',
          height: '3em',
          position: 'fixed',
          zIndex: 3,
          top: '0',
          left: '0',
          background: 'rgba(0,0,0,0.82)',
          opacity: '.9'
        }}>
          <nav className="ui inverted secondary pointing menu">
            <Link to="/feed" className="item" activeClassName="active">
              Feed
            </Link>
            {/*<Link to="/profile" className="item" activeClassName="active">*/}
              {/*Profile*/}
            {/*</Link>*/}
            <div className="right menu">
              <Link to="/create" className="ui item" activeClassName="active">
                Create
              </Link>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

export default Navbar
