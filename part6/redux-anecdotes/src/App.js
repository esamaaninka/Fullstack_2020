import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import AnectodeList from './components/AnectodeList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
//import anecdoteService from './services/anecdotes'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAnecdotes())    
  //  anecdoteService      
  //    .getAll()
  //    .then(anecdotes => dispatch(initAnecdotes(anecdotes)))  
    }, [dispatch])
  
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