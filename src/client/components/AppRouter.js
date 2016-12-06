/**
 * Created by timur on 12/5/16.
 */

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext, Router, IndexRedirect, Route } from 'react-router'
import ReactGA from 'react-ga'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import App from './App'
import app from '../../server/app'
// import Posts from './Feed'
// import Profile from './Profile'
// import CreatePost from './CreatePost'
// import DetailedPost from './DetailedPost'

const history = createMemoryHistory()

function logPageView() {
  window.scrollTo(0, 0)
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

const Feed = () => <div>Feed</div>

const NotFound = () => <div>Not Found</div>

const AppRouter = () =>
  <Router onUpdate={logPageView} history={history}>
    <Route path="/" component={App}>
      <IndexRedirect to="/feed"/>
      <Route path="/feed" component={Feed}/>
      <Route path="*" component={NotFound}/>

      {/*<Route path="/feed" component={Posts}/>*/}
      {/*<Route path="/profile" component={Profile}/>*/}
      {/*<Route path="/create" component={CreatePost}/>*/}
      {/*<Route path="/:id" component={DetailedPost}/>*/}
    </Route>
  </Router>


app.get('/', (req, res) => {
  // Note that req.url here should be the full URL path from
  // the original request, including the query string.
  match({ AppRouter, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      res.status(200).send(renderToString(<RouterContext {...renderProps} />))
    } else {
      res.status(404).send('Not found')
    }
  })
})

export default AppRouter
