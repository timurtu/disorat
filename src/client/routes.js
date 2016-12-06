/**
 * Created by timur on 12/5/16.
 */

import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import App from './components/App'
import Feed from './components/Feed'
import CreatePost from './components/CreatePost'
import DetailedPost from './components/DetailedPost'


const NotFound = () => <h1>404 - Page not found</h1>

module.exports = (
  <Route path="/" component={App}>
    <IndexRedirect to="/feed"/>
    <Route path="/feed" component={Feed}/>
    <Route path="/create" component={CreatePost}/>
    <Route path="/:post" component={DetailedPost}/>
    <Route path="*" component={NotFound}/>
  </Route>
)
