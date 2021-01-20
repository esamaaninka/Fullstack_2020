import React from 'react'
import AnectodeList from './components/AnectodeList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnectodeList />
      <AnecdoteForm />
    </div>
  )
}

export default App