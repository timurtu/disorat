/**
 * Created by timur on 1/16/17.
 */

import React, { Component } from 'react'
import ReactGA from 'react-ga'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import routes from '../routes'

class Root extends Component {

  componentDidMount() {
    ReactGA.initialize('UA-87619352-1')
  }

  routeChange() {
    window.scrollTo(0, 0)
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <Router
          onUpdate={this.routeChange}
          history={browserHistory}
          routes={routes}
        />
      </Provider>
    )
  }
}

export default Root
