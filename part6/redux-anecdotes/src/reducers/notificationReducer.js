

const notificationReducer = (state = '', action) => {
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

export const showNotification = (notification, timeout) => {
    
   return async dispatch => {
    
    clearTimeout(timer)
    
    dispatch({
      type: 'SHOW_NOTIFICATION',
      content: notification
    })
    
    timer = window.setTimeout(()=>{
      dispatch({type: 'HIDE_NOTIFICATION'})
    }, timeout*1000)   
  }
}
        
export default notificationReducer