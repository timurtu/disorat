/**
 * Created by timur on 12/5/16.
 */

import React from 'react'
import Helmet from 'react-helmet'
import Navbar from '../components/Navbar'
import Search from '../components/Search'

const App = ({ children }) =>
  <div>
    <Helmet
      defaultTitle="disorat | Vote on Anything"
      title="disorat"
      titleTemplate="disorat | %s"
    />
    <Navbar/>

    <Search default="Search..."/>

    <div style={{
      backgroundColor: '#000',
      maxWidth: '50em',
      margin: '3em auto 0'
    }} className="ui inverted segment">
      {children}
    </div>
  </div>

export default App
