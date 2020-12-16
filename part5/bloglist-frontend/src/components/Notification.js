import React from 'react'
/*
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}
*/
// messages and errors from 2e part2 example

const messageStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const errorStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

const Notification = ({ message, errorFlag }) => {
  //console.log('Notification: ', message, errorFlag)
  if(!message) return null

  else return(
    <div className="error" style={errorFlag === false ? messageStyle : errorStyle}>
      {message}
    </div>
  )
}



export default Notification