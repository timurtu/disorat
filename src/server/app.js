/**
 * Created by timur on 11/11/16.
 */

import express from 'express'
import log from 'gutil-color-log'
import logger from './logger'


const app = express()
const port = 3000

app.use(express.json())
app.use(express.static('public'))
app.use(logger)

app.listen(port, () => log('cyan', 'listening on port ' + port))

export default app
