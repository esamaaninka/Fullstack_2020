import React from 'react'
//import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
//import { bindActionCreators } from 'redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
//import anecdotes from '../services/anecdotes'



const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <li>
      {anecdote.content}
      <p>Votes: {anecdote.votes}
        <button onClick={handleClick}>vote</button></p>
    </li>
  )
}



//const Anecdotes = () => {
const Anecdotes = (props) => {
/*
  const dispatch = useDispatch()

  const anecdotes = 
    useSelector(state => 
                  state
                    .anecdote
                    .filter(a => a.content.includes(state.filter))
                    .sort((a, b) => (a.votes < b.votes ? 1 : -1))
    )


  const handleVote = (p) => {
    //dispatch(voteAnecdote(p.id))
    dispatch(voteAnecdote(p))
    dispatch(showNotification(`You voted for: "${p.content}"`, 5))
  }
  */
/*
 const boundActionCreators = bindActionCreators(
  {voteAnecdote,showNotification}, 
  dispatch
  )
*/
  return (
    <ul>
      {props.anecdotes
        //.sort((a, b) => (a.votes < b.votes ? 1 : -1))
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() =>
              //dispatch(voteAnecdote(anecdote.id))
              //handleVote(anecdote)
              //props.handleVote(anecdote)
              props.voteAnecdote(anecdote)
            }
          />
        )}
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => ({
  voteAnecdote: anecdote => {
    dispatch(voteAnecdote(anecdote))
    dispatch(showNotification(`You voted for: "${anecdote.content}"`, 5))
  }
})


const mapStateToProps = (state) => {
  return {
    anecdotes: 
      state
        .anecdote
        .filter(a => a.content.includes(state.filter))
        .sort((a, b) => (a.votes < b.votes ? 1 : -1))
  }
}
//export default Anecdotes
const ConnectedAnecdotes = connect(
    mapStateToProps
    ,mapDispatchToProps
  )(Anecdotes)

export default ConnectedAnecdotes