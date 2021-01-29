import React from 'react'
import ReactDOM from 'react-dom'
//import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import { showNotification } from './reducers/notificationReducer'
//import reducer from './reducers/anecdoteReducer'

//const store = createStore(reducer)

import store from './reducers/store'

//store.subscribe(() => console.log('Index: ',store.getState()))
//store.dispatch(showNotification('TESTING'))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
)