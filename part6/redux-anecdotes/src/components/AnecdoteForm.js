import React from 'react'
import { connect } from 'react-redux'
//import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

// redux connect way
const NewAnecdote = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.newAnecdote(content)
  }
  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">Create new</button>
    </form>
  )
}

const mapDispatchToProps = (dispatch) => ({
  newAnecdote: content => {
    dispatch(newAnecdote(content))
    dispatch(showNotification(`You added anecdote: "${content}"`, 5))
  }
})


const ConnectedNewAnecdote = connect( 
  null,//mapStateToProps
  mapDispatchToProps
)(NewAnecdote)

export default ConnectedNewAnecdote

/* react-redux 
const NewAnecdote = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = (event) => {
    //console.log('NewAnecdote: ', event.target.anecdote.value)
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(content))
    dispatch(showNotification(`You added anecdote: "${content}"`, 5))
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">Create new</button>
    </form>
  )
}

export default NewAnecdote
*/