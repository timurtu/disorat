/**
 * Created by timur on 11/11/16.
 */

import 'babel-register'
import express from 'express'
import log from 'gutil-color-log'
import bodyParser from 'body-parser'
import compression from 'compression'
import logger from './tools/logger'


const app = express()
const port = process.env.PORT || 3000

app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(logger)

app.listen(port, () => log('cyan', `listening on port ${port}`))

export default app
