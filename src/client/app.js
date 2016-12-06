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
  <Router routes={routes} history={browserHistory}/>,
  document.getElementById('root')
)
