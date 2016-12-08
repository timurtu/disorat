/**
 * Created by timur on 12/5/16.
 */

import React from 'react'
import Navbar from '../components/Navbar'
import Search from '../components/Search'

const App = ({ children }) =>
  <div>
    <Navbar/>
    <div style={{
      marginTop: '3em',
      backgroundColor: '#000'
    }} className="ui inverted segment">
      {children}
    </div>
  </div>

export default App
