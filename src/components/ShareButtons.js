/**
 * Created by timur on 1/16/17.
 */

import React from 'react'

export class TwitterShareButton extends React.Component {

  componentDidMount() {
    const script = document.createElement('script')
    script.src = '//platform.twitter.com/widgets.js'
    document.body.appendChild(script)
  }

  render() {
    return (
      <a
        href={this.props.url}
        className="twitter-share-button"
        data-size="large"
      >
        Tweet
      </a>
    )
  }
}

export const FacebookShareButton = ({
  url
}) => (
  <iframe
    src={`https://www.facebook.com/plugins/share_button.php?href=
          ${encodeURIComponent(url)}
          &layout=button&size=large&mobile_iframe=true&appId=176185646121120&width=73&height=28`}
    width="73"
    height="28"
    style={{
      border: 'none',
      overflow: 'hidden'
    }}
    scrolling="no"
    frameBorder="0"
    allowTransparency="true"/>
)
