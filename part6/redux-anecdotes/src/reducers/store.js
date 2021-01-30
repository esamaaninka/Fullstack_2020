import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'

import thunk from "redux-thunk"
import { applyMiddleware } from "redux"


const reducer = combineReducers({
    anecdote: anecdoteReducer,
    notification: notificationReducer
})

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(thunk)
    )
)

export default store