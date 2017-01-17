/**
 * Created by timur on 11/11/16.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'
import configureStore from './configureStore'
import 'bootswatch/flatly/bootstrap.css'
window.jQuery = require('jquery/dist/jquery')
require('bootstrap/dist/js/bootstrap')

const store = configureStore()

const render = () => {
  ReactDOM.render(
    <Root store={store}/>,
    document.getElementById('root')
  )
}

store.subscribe(render)
render()
