/**
 * Created by timur on 12/5/16.
 */


import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from '../client/routes'
import app from './app'


app.get('*', (req, res) => {
  match({routes, location: req.url }, (err, redirect, props) => {
    const html = renderPage(<RouterContext {...props}/>)
    res.send(renderPage(html))
  })
})

function renderPage(html) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>disorat | Vote on Anything</title>
        <meta name="fragment" content="!">
        <meta name="description"
              content="Vote on anything anonymously in real time. Create and share a post with your friends or family to settle an argument."/>
        <meta name="keywords" content="vote,on,anything,anonymous,real time,create,share,post,argument"/>
        <meta name="robots" content="index,follow"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/semantic-ui/2.2.6/semantic.min.css">
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <script>
          (adsbygoogle = window.adsbygoogle || []).push({
            google_ad_client: "ca-pub-1252778884078131",
            enable_page_level_ads: true
          })
        </script>
    </head>
    
    <body style="background:rgba(0,0,0,0.82);">
    
    <div id="root">${html}</div>
    
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/semantic-ui/2.2.6/semantic.min.js"></script>
    <script src="bundle.js"></script>
    
    </body>
    </html>
  `
}
