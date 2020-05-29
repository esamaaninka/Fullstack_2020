import React from 'react';

const Course = ({course} ) => {
  console.log('Course: ', course.name)
  console.log('Course: ', course.parts)
  return(
    <div>
      <h1>{course.name}</h1>
      {course.parts.map(parts => <p key={parts.id}> {parts.name + ' ' + parts.exercises} </p>) }    
       <h2>Total of {' ' + course.parts.reduce((sum, part) => sum + part.exercises, 0)  + ' excercises'}</h2> 
    </div>
  )
}

export default Course