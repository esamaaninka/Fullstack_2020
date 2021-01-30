import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content}
      <p>Votes: {anecdote.votes}
        <button onClick={handleClick}>vote</button></p>
    </li>
  )
}


const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdote)

  const handleVote = (p) => {
    dispatch(voteAnecdote(p.id))
    dispatch(showNotification(`You voted for: "${p.content}"`))
  }
  

  return (
    <ul>
      {anecdotes
        .sort((a, b) => (a.votes < b.votes ? 1 : -1))
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() =>
              //dispatch(voteAnecdote(anecdote.id))
              handleVote(anecdote)
            }
          />
        )}
    </ul>
  )
}

export default Anecdotes