/**
 * Created by timur on 12/5/16.
 */

import React from 'react'
import Helmet from 'react-helmet'
import Navbar from './Navbar'

class App extends React.Component {
  render() {
    const {children} = this.props
    return(
      <div>
        <Helmet
          defaultTitle="Disorat"
          titleTemplate="%s | Disorat"
        />

        <Navbar
          title="Disorat"
          links={[
            {
              name: 'View All Votes',
              path: '/'
            },
            {
              name: 'Create a New Vote',
              path: '/create'
            }
          ]}
          id="nav-collapse"
        />

        <div style={{
          marginTop: '4.75em'
        }}/>

        <div className="container">
          {children}
        </div>
      </div>
    )
  }
}

export default App
