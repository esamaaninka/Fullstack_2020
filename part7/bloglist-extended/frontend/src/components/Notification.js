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

const Notification = ({ message } ) => {
  console.log('Notification: ', message.message, message.error)
  if(!message.message) return null

  else return(
    <div className="error" style={message.error === false ? messageStyle : errorStyle}>
      {message.message}
    </div>
  )
}



export default Notification