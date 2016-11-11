/**
 * Created by timur on 11/11/16.
 */

import 'babel-polyfill'
import log from 'gutil-color-log'
import co from 'co'

import db from './db'
import {onError} from './utils'


db.set('message1', 'hello, this is doge')
db.set('message2', 'hello, no this is spider')

co(function*() {

  const msg1 = yield db.getAsync('message1')
  const msg2 = yield db.getAsync('message2')

  log('cyan', msg1)
  log('cyan', msg2)

}).catch(onError)
