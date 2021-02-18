import { useState } from 'react'

export const useField = (type) => {  
  const [value, setValue] = useState('')

  //console.log('Hooks: ', type)
  const onChange = (event) => {
    //console.log("Hook value: ", event.target.value)
    setValue(event.target.value)
  }

  const reset = () => {
      setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

// modules can have several named exports
export const useAnotherHook = () => {  // ...
}