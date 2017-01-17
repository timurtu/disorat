/**
 * Created by timur on 1/16/17.
 */

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './components/App'
import VoteList from './components/VoteList'
import CreateVote from './components/CreateVote'
import Vote from './components/Vote'
import PageNotFound from './components/PageNotFound'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={VoteList}/>
    <Route path="/create" component={CreateVote}/>
    <Route path="/votes/:id" component={Vote}/>
    <Route path="*" component={PageNotFound}/>
  </Route>
)
