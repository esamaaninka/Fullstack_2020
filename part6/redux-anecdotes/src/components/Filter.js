import React from 'react'
import {connect} from 'react-redux'
//import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

// redux connect way
const Filter = (props) => {

  const handleChange = async (event) => {
    // input-field value is in variable event.target.value
    //console.log('Filter component handleChange got: ', event.target.value)
    props.setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}


const mapDispatchToProps = (dispatch) => ({
  setFilter: filter => {
    dispatch(setFilter(filter))
  }
})

const ConnectedFilter = connect(
  null,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter



/* react-redux way
const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    //console.log('Filter component handleChange got: ', event.target.value)
    dispatch(setFilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
*/