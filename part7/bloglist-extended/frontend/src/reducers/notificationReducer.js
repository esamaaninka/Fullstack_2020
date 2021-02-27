

const notificationReducer = (state = '', action) => {
  //console.log('reducers/notificationReducer got: ',
  //action.type, action.content, action.errorStatus)

  switch (action.type) {
  case 'SHOW_NOTIFICATION':
    return action.content
  case 'HIDE_NOTIFICATION':
    return ''
  default:
    return state
  }
}

var timer =  null

export const showNotification = (notification, error, timeout) => {
  return async dispatch => {

    clearTimeout(timer)

    dispatch({
      type: 'SHOW_NOTIFICATION',
      content: {
        message: notification,
        errorStatus: error
      }
    })

    timer = window.setTimeout(() => {
      dispatch({ type: 'HIDE_NOTIFICATION' })
    }, timeout*1000)
  }
}

export default notificationReducer