/**
 * Created by timur on 11/21/16.
 */

import app from '../app'


const sendIndex = (req, res) => {
  res.sendfile('public/index.html')
}

app.get('*', sendIndex)
