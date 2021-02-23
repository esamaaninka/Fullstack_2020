import React, { useState, useEffect } from 'react'
import axios from 'axios'
const baseUrl = 'https://restcountries.eu/rest/v2/name/'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
    
  //console.log(`Attempt to search: ${baseUrl}${name}?fullText=true`)

  useEffect(() => {
    if(name.length>1){
      axios
        .get(`${baseUrl}${name}?fullText=true`)
        .then(response => {
          //console.log('useCountry found: ', response)
          const foundCountry= response
          foundCountry.found=true
          setCountry(foundCountry)
        })
        .catch(()=>{
          setCountry({found: false})
        })
    }
  },[name])

  return country
}

const Country = ({ country }) => {
  //console.log('Country: ', country)
  if (!country) {
    return null
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data[0].name} </h3>
      <div>capital {country.data[0].capital} </div>
      <div>population {country.data[0].population}</div> 
      <img src={country.data[0].flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
   }
 
  //Finlandconsole.log(`App: nameInput.value: ${nameInput.value}, name: ${name}, country: ${country}`)
  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App