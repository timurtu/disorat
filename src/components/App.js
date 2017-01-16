/**
 * Created by timur on 12/5/16.
 */

import React from 'react'
import Helmet from 'react-helmet'
import Navbar from './Navbar'

export default ({ children }) =>
  <div>
    <Helmet
      defaultTitle="disorat | Vote on Anything"
      title="disorat"
      titleTemplate="disorat | %s"
    />

    <Navbar
      title="Disorat"
      links={[
        {
          name: 'View All Votes',
          path: '/'
        },
        {
          name: 'Create a New Vote',
          path: '/create'
        }
      ]}
      id="nav-collapse"
    />

    <div style={{
      marginTop: '4.75em'
    }}/>

    <div className="container">
      {children}
    </div>
  </div>
