import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ countryToSearch, setSearchCountry] = useState('')  


  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          //console.log('promise fulfilled')
          //console.log("data: ", response.data)
          setCountries(response.data)
      })
  }, [])

  const DisplayCountries = () => {
    //console.log('DisplayCountries: ', countries)
    let msg = ''
    var country=countries.filter(c => c.name.toLowerCase()
                          .includes(countryToSearch.toLowerCase()))
    //                     .startsWith(countryToSearch))
                         
    console.log('Length: ', country.length)
     if(country.length > 10) {
      msg='Search criteria too wide'
    }
    else if(country.length >1 ) {
      msg = country.map(p => <p key={p.name}>{p.name}</p>)
    }
    else if(country.length===0) {
      msg='No countries found with given criteria'
    }
    if(country.length===1) {
      //console.log('The country:', country[0])
      return (
        <div>          
            <h1>{country[0].name}</h1>
              <p>capital {country[0].capital}</p>
              <p>population {country[0].population}</p>
            <h2>languages</h2>          
              <p>{country[0].languages.map(p => <p key={p.name}>{p.name}</p>)}</p>
            <img height="70" width="140" src={country[0].flag} alt="country flag" />
        </div>
      )
    }
      return(        
        <p>{msg}</p> 
    )
  }

  const getSearchCountry = (event) => {
    console.log("getSearchCountry: ", event.target.value)
    return(
      setSearchCountry(event.target.value)
    )
  }
  return (
    <div>
      find countries 
        <input value={countryToSearch}
          onChange={getSearchCountry}
          /> 
    
       <DisplayCountries/>
  </div>
  );
}

export default App;
