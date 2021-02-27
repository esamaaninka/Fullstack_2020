import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

import notificationReducer from './notificationReducer'

const reducer = combineReducers({
  //anecdote: anecdoteReducer,
  notification: notificationReducer
  //filter: filterReducer
})

const store = createStore(reducer,
  composeWithDevTools(applyMiddleware(thunk)
  )
)

export default store