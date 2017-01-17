/**
 * Created by timur on 12/5/16.
 */

import React from 'react'
import Helmet from 'react-helmet'
import Navbar from './Navbar'
import { apiUrl } from '../globals'

let prevState

class App extends React.Component {

  componentDidMount() {
    setInterval(() => {
      const { store } = this.context
      const state = store.getState()

      if (prevState !== state) {
        fetch(`${apiUrl}/change?state=${JSON.stringify(state)}`, {
          method: 'POST'
        })
          .then(() => {
            prevState = state
          })
      }
    }, 1000)
  }

  render() {
    const { children } = this.props
    return (
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
App.contextTypes = {
  store: React.PropTypes.object
}

export default App
