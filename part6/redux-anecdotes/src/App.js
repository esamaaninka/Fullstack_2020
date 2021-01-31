import React from 'react'
import AnectodeList from './components/AnectodeList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnectodeList />
      <AnecdoteForm />
    </div>
  )
}

export default App