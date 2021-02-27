import React from 'react'
import { useSelector } from 'react-redux'

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

const Notification = () => {

  const notif = useSelector(state => state.notification)
  //console.log('component/Notification got: ', notif.message, notif.errorStatus)
  if (notif.message)
    return (
      <div style={!notif.errorStatus ? messageStyle : errorStyle}>
        {notif.message}
      </div>
    )
  else return null
}

export default Notification