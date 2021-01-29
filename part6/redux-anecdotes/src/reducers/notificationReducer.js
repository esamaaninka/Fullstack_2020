

const notificationReducer = (state = 'TEST', action) => {
    console.log('notificationReducer got: ',state)
    //console.log('notificationReducer msg_ ', action.notification)
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

export const showNotification = (notification) => {
    console.log('Notification reducer showNotification: ', notification)
    
    return {
      type: 'SHOW_NOTIFICATION',
      content: notification
   }
    }
        
export default notificationReducer