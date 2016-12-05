/**
 * Created by timur on 11/11/16.
 */

import dom from 'domali'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'
import AppRouter from './components/AppRouter'

ReactGA.initialize('UA-87619352-1')

ReactDOM.render(<AppRouter/>, dom.getId('root'))
