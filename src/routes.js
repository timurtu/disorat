/**
 * Created by timur on 1/16/17.
 */

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
// import Feed from './components/Feed'
import Votes from './components/Votes'
// import CreatePost from './CreatePost'
import CreateVote from './components/CreateVote'
// import DetailedPost from './components/DetailedPost'
import Vote from './components/Vote'
import PageNotFound from './components/PageNotFound'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Votes}/>
    <Route path="/create" component={CreateVote}/>
    <Route path="/votes/:id" component={Vote}/>
    <Route path="*" component={PageNotFound}/>
  </Route>
)
