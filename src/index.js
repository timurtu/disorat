/**
 * Created by timur on 11/11/16.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import Root from './components/Root'
import 'bootswatch/flatly/bootstrap.css'
window.jQuery = require('jquery/dist/jquery')
require('bootstrap/dist/js/bootstrap')


const votes = (state = [], action) => {
  switch (action.type) {

    case 'ADD_VOTE':
      const { title, option1, option2 } = action
      return [
        ...state,
        {
          title,
          option1,
          option2,
          option1votes: 0,
          option2votes: 0,
          reasons1: [],
          reasons2: []
        }
      ]

    default:
      return state
  }
}

const store = createStore(votes)

const render = () => {
  ReactDOM.render(
    <Root store={store}/>,
    document.getElementById('root')
  )
}

store.subscribe(render)
render()
