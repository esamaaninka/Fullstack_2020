import React from 'react'
import AnectodeList from './components/AnectodeList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <AnectodeList />
      <AnecdoteForm />
    </div>
  )
}

export default App