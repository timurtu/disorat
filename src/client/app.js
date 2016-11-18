/**
 * Created by timur on 11/11/16.
 */

import dom from 'domali'
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, IndexRedirect, Route, browserHistory } from 'react-router'
import ReactGA from 'react-ga'
import Navbar from './Navbar'
import Posts from './Feed'
// import Profile from './Profile'
import CreatePost from './CreatePost'
import DetailedPost from './DetailedPost'


ReactGA.initialize('UA-87619352-1')

const App = ({ children }) =>
  <div>
    <Navbar/>
    <div style={{
      marginTop: '3em'
    }} className="ui segment">
      {children}
    </div>
  </div>

function logPageView() {
  window.scrollTo(0, 0)
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

ReactDOM.render((
  <Router onUpdate={logPageView} history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to="/feed"/>
      <Route path="/feed" component={Posts}/>
      {/*<Route path="/profile" component={Profile}/>*/}
      <Route path="/create" component={CreatePost}/>
      <Route path="/:id" component={DetailedPost}/>
    </Route>
  </Router>
), dom.getId('root'))
