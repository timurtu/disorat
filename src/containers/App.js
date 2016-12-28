/**
 * Created by timur on 12/5/16.
 */

import React from 'react'
import Helmet from 'react-helmet'
import Navbar from '../components/Navbar'

const App = ({ children }) =>
  <div>
    <Helmet
      defaultTitle="disorat | Vote on Anything"
      title="disorat"
      titleTemplate="disorat | %s"
    />

    <Navbar
      title="Disorat"
      links={['feed', 'create']}
      id="nav-collapse"
    />


    <div style={{
      marginTop: '4.75em'
    }}/>

    {children}
  </div>

export default App
