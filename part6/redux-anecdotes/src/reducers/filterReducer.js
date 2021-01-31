const initialState = ''

const filterReducer = (state = initialState, action) => {
    
    //console.log('filterReducer got: ', action.type)

    switch (action.type) {
      case 'SET_FILTER':
        return action.filter
      default:
        return state
    }
  }
  
  export const setFilter = (filter) => {
    //console.log('FilterReducer setFilter got: ',filter)
    return {
      type: 'SET_FILTER',
      filter
    }
  }
  
  export default filterReducer