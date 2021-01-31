import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './anecdoteReducer'
import notificationReducer from './notificationReducer'
import filterReducer from './filterReducer'

import thunk from "redux-thunk"
import { applyMiddleware } from "redux"


const reducer = combineReducers({
    anecdote: anecdoteReducer,
    notification: notificationReducer,
    filter: filterReducer
})

const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(thunk)
    )
)

export default store