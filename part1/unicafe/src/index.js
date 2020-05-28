import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic= (props) => {
  //console.log('Statistic: ', props)
  return(
      <tr>
        <td>{props.text}</td>
        <td> {props.value} </td>
      </tr>
  )
}

const Statistics = (props) => {
  //console.log('Stats:', props)
  let votes=props.good+props.neutral+props.bad
  let positive=props.good/votes*100 +' %'
  let average=(props.good - props.bad)/votes

  //console.log('Votes', votes, 'Average', average, 'Positive', positive)
            
  if(votes===0) {
      return( 
        <div> 
          <h1>statistics</h1>
          No feedback given
        </div> )  
  }
  
  return(
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <Statistic text="good" value ={props.good} />
          <Statistic text="neutral" value ={props.neutral} />
          <Statistic text="bad" value ={props.bad} />
          <Statistic text="all" value ={votes} />
          <Statistic text="average" value ={average} />
          <Statistic text="positive" value ={positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback </h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)