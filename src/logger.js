/**
 * Created by timur on 11/11/16.
 */

import log from 'gutil-color-log'

export default function(req, res, next) {

  const start = +new Date()

  res.on('finish', () => {
    const duration = +new Date() - start
    log('cyan', `${req.method} request to ${req.url} took ${duration}ms`)
  })

  next()

}
