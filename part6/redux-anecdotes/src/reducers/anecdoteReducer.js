import anecdoteService from '../services/anecdotes'
/* 
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)


export const asObject = (anecdote) => {
  return {
    content: anecdote,
    //id: getId(),
    votes: 0
  }
}
*/
//const reducer = (state = initialState, action) => {
const reducer = (state = [], action) => {

  //console.log('state before acion: ', state)
  //console.log('action', action)

  switch(action.type) {
    case 'NEW_ANECDOTE':
      //console.log('switch new_anectode')
      return [...state, action.data]
    
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes +1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote) 
    
    case 'INIT_ANECDOTES':
      return action.data
    
    default: 
      return state
  }
}

export const newAnecdote = (content) => {
  //debugger
  //console.log('creating new Anectode: ', content)
  return async dispatch => {
    const savedAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: savedAnecdote 
    //{
    //  savedAnecdote,
    //  votes: 0
     // id: getId()
    //}
    })
  }
}

export const voteAnecdote = (id) => {
  //console.log('Voting id:', id)
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default reducer