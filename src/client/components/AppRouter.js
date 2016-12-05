/**
 * Created by timur on 12/5/16.
 */

import React from 'react'
import { Router, IndexRedirect, Route, browserHistory } from 'react-router'
import ReactGA from 'react-ga'
import App from './App'
import Posts from './Feed'
// import Profile from './Profile'
import CreatePost from './CreatePost'
import DetailedPost from './DetailedPost'


function logPageView() {
  window.scrollTo(0, 0)
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

const AppRouter = () => <Router onUpdate={logPageView} history={browserHistory}>
  <Route path="/" component={App}>
    <IndexRedirect to="/feed"/>
    <Route path="/feed" component={Posts}/>
    {/*<Route path="/profile" component={Profile}/>*/}
    <Route path="/create" component={CreatePost}/>
    <Route path="/:id" component={DetailedPost}/>
  </Route>
</Router>

export default AppRouter
