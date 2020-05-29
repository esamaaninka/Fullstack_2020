import React from 'react';
import './App.css';


const Course = ({course} ) => {
  //console.log('Course: ', course.name)
  //console.log('Course: ', course.parts[0])
  return(
    <div>
      <h1>{course.name}</h1>
          {course.parts.map(parts => <p key={parts.id}> {parts.name + ' ' + parts.exercises} </p>) }
      <h2>Total of {' ' + course.parts.reduce((sum, part) => sum + part.exercises, 0)}</h2> 
    </div>
  )
}



  const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App