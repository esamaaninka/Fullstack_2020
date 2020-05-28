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
  //console.log('Content: ', props.part, props.nbr_of_exercises)
  return(
    <div>
      <p>
      {props.part} {props.nbr_of_exercises} 
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
  const course = 'Half Stack application development'
  const part1 = { 
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
      name: 'Using props to pass data',
      exercises: 7
  }
  const part3 = {
      name: 'State of a component',
      exercises: 14
  }

  return (
    <div>
      <h1>
        <Headeri course={course} />
      </h1>
        <Content part={part1.name} nbr_of_exercises={part1.exercises} />
        <Content part={part2.name} nbr_of_exercises={part2.exercises} />
        <Content part={part3.name} nbr_of_exercises={part3.exercises} />
        <Total text='Number of excercises ' total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
