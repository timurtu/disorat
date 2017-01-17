/**
 * Created by timur on 1/16/17.
 */

import { createStore } from 'redux'
import votes from './reducers/votes'
import { apiUrl } from './globals'

const configureStore = () => fetch(`${apiUrl}/posts`, { method: 'POST' })
    .then(res => res.json())
    .then(initialState => createStore(votes, initialState))

export default configureStore
