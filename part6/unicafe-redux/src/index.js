import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'
import './index.css'

const store = createStore(reducer)

const Statistic= (props) => {
  //console.log('Statistic: ', props)
  return(
      <tr>
        <td>{props.text}</td>
        <td> {props.value} </td>
      </tr>
  )
}

const Statistics = () => {
  const stats = store.getState()
  
  let votes=stats.good+stats.ok+stats.bad
  let positive=stats.good/votes*100 +' %'
  let average=(stats.good - stats.bad)/votes

  console.log('Votes', votes, 'Average', average, 'Positive', positive)
            
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
          <Statistic text="good" value ={store.good} />
          <Statistic text="neutral" value ={store.neutral} />
          <Statistic text="bad" value ={store.bad} />
          <Statistic text="all" value ={votes} />
          <Statistic text="average" value ={average} />
          <Statistic text="positive" value ={positive} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'ZERO'
    })    
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      {/*
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
        */
      }
      <Statistics />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
