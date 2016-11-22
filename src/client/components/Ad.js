/**
 * Created by timur on 11/21/16.
 */

import React from 'react'


export default class Ad extends React.Component {

  componentDidMount() {
    (adsbygoogle = window.adsbygoogle || []).push({})
  }

  render() {
    return (
      <ins className="adsbygoogle"
           style={{
             display: 'block'
           }}
           data-ad-client="ca-pub-1252778884078131"
           data-ad-slot="2677453370"
           data-ad-format="auto"></ins>
    )
  }
}
