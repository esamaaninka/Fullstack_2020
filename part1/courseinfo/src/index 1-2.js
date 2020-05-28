import React from 'react'
import ReactDOM from 'react-dom'


const Headeri = (props) => {
  //console.log('Header: ', props.course)
  return (
    <div>
      <p>
        {props.course}
      </p>
    </div>
  )
}
const Content = (props) => {
  console.log('Content: ', props)
  return(
    <div>
      <p>
        {props.part} {props.nbr_of_excercises} 
      </p>
    </div>
    )
}

const Total = (props) => {
  console.log('Totaali: ', props.text, props.total)
  return(
    <div>
      <p>
        {props.text} {props.total}
      </p>
    </div>
    
  )

}

const App = () => {
  const course = 'Half Stacki application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <h1>
        <Headeri course={course} />
      </h1>
        <Content part={part1} nbr_of_excercises={exercises1} />
        <Content part={part2} nbr_of_excercises={exercises2} />
        <Content part={part3} nbr_of_excercises={exercises3} />
        <Total text='Number of excercises ' total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
