/**
 * Created by timur on 12/5/16.
 */

import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'
import App from './containers/App'
import Feed from './containers/Feed'
import CreatePost from './components/CreatePost'
import DetailedPost from './containers/DetailedPost'
import PageNotFound from './components/PageNotFound'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Feed}/>
    <Redirect from="/feed" to="/"/>
    <Route path="/create" component={CreatePost}/>
    <Route path="/votes/:post" component={DetailedPost}/>
    <Route path="*" component={PageNotFound}/>
  </Route>
)
