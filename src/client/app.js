/**
 * Created by timur on 11/11/16.
 */

import dom from 'domali'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import Navbar from './Navbar'
import Posts from './Posts'
import Profile from './Profile'
import CreatePost from './CreatePost'

const App = ({ children }) =>
  <div>
    <Navbar/>
    <div style={{
      marginTop: '3em'
    }} className="ui segment">
      {children}
    </div>
  </div>

const scrollTop = () => window.scrollTo(0, 0)

ReactDOM.render((
  <Router onUpdate={scrollTop} history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Posts}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/create" component={CreatePost}/>
    </Route>
  </Router>
), dom.getId('root'))
