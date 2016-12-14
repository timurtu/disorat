/**
 * Created by timur on 11/21/16.
 */

import React from 'react'


export default class Ad extends React.Component {

  componentDidMount() {
    const adsbygoogle = window.adsbygoogle || []
    adsbygoogle.push({})
  }

  render() {
    return (
      <ins style={{
        display: 'block'
      }} className="adsbygoogle"
           data-ad-client="ca-pub-1252778884078131"
           data-ad-slot="2677453370"
           data-ad-format="auto"/>
    )
  }
}


