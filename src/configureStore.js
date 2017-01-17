/**
 * Created by timur on 1/16/17.
 */

import { createStore } from 'redux'
import votes from './reducers/votes'

const configureStore = () => {

  const store = createStore(votes)

  return store
}

export default configureStore
