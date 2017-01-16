/**
 * Created by timur on 1/16/17.
 */

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import Feed from './components/Feed'
// import CreatePost from './CreatePost'
import CreateVote from './components/CreateVote'
import DetailedPost from './components/DetailedPost'
import PageNotFound from './components/PageNotFound'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Feed}/>
    <Route path="/create" component={CreateVote}/>
    <Route path="/votes/:post" component={DetailedPost}/>
    <Route path="*" component={PageNotFound}/>
  </Route>
)
