/**
 * Created by timur on 11/11/16.
 */

import React from 'react'
import ReactGA from 'react-ga'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './routes'

ReactGA.initialize('UA-87619352-1')


render(
  <Router onUpdate={() => {
    window.scrollTo(0, 0)
    ReactGA.set({ page: window.location.pathname })
    ReactGA.pageview(window.location.pathname)
  }} history={browserHistory} routes={routes}/>,
  document.getElementById('root')
)
