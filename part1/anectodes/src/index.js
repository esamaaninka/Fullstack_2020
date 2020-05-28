import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => { 
  //console.log(props)
  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const Display = props => <div>{props.text}</div>

const MostVoted = ({anectodes, mostvoted}) => {
  //console.log('Mostvoted: ', mostvoted)
  return(
    <div>{anecdotes[mostvoted]}</div>
  )
}

const App = (anectodes) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))

    return (
    <div>
      <h1>Anectode of the day</h1>
      <Display text={anecdotes[selected]}/>
      <Display text={'has ' + votes[selected] + ' votes'} />
      {//<Display text={'Votes ' + votes} />
      }
      <Button 
            handleClick={() => { 
                //console.log('Voting: ', selected) 
                let voted = [...votes]
                voted[selected] +=1 
                setVote(voted)
              }
            } 
            text='vote'
        />  
   
      <Button 
          handleClick={() => setSelected(Math.floor(Math.random()*(anecdotes.length)))}
          text="Next anectode"
        />
      <h1>Anectode with most votes</h1>
      <Display text={anectodes[votes.indexOf(Math.max(...votes))]} />
      <MostVoted anecdotes={anectodes} mostvoted={votes.indexOf(Math.max(...votes))}/>
      { 
      //<Display text={votes} />
      }
      
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
