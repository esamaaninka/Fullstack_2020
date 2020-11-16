import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'
import GetWeather from './components/weather'
//import { queryByPlaceholderText } from '@testing-library/react';


const App = () => {
  const [ countries, setCountries] = useState([])
  const [ countryToSearch, setCountryToSearch] = useState('') 
  const [ theCountry, setTheCountry] = useState('') 
  //const [ theWheather, setTheWheather] = useState('')

  
  //var theCountrySet = 0

  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          console.log('promise fulfilled')
          //console.log("response.data: ", response.data)
          setCountries(response.data)
      })
  }, [])
  
  
    
  

  const DisplayCountryDetails = (theC) => {
      console.log('DisplayCountryDetails : ', theC)
      // tämä aiheuttaa virheen, käytä useEffect poistaa
            /*Warning: Cannot update a component (`App`) while rendering a different component (`DisplayCountries`). To locate the bad setState() call inside `DisplayCountries`, follow the stack trace as described in https://fb.me/setstate-in-render
          in DisplayCountries (at App.js:114)
          in div (at App.js:108)
          in App (at src/index.js:9)
          in StrictMode (at src/index.js:8)*/
      useEffect(() => {
      setTheCountry(theC)
      })
      //setCountryToSearch(theC.alpha3code)
      return (
        <div>          
          <h1>{theC.name}</h1>
            <p>capital {theC.capital}</p>
            <p>population {theC.population}</p>
          <h2>languages</h2>          
            {theC.languages.map(p => <p key={p.name}>{p.name}</p>)}
          <img height="70" width="140" src={theC.flag} alt="country flag" />
          
          {//<p>{getWeather(theC.capital)}</p>
          // ei voi olla tässä kaatuu
  }
          
        </div>
      )
  }

  const DisplayCountries = () => {
    //console.log('DisplayCountries', countries)
    //console.log('Displayc countryToSearch: ', countryToSearch)
    var searched_countries=countries.filter(c => c.name.toLowerCase()
                          .includes(countryToSearch.toLowerCase()))  

    console.log('Searched country: ', searched_countries)
    console.log('Length: ', searched_countries.length)
    console.log('TheCountry: ', theCountry)
    // KATSO KESKUSTELU
    //https://t.me/fullstackcourse/51740
    
    if(searched_countries.length > 10) return <div>Search criteria too wide</div>
    else if(searched_countries.length===0) return <div>No countries found with given criteria</div>
    
    // ei toimi tämän vertailun kanssa -> strcmp ja palauttaa valittu maa ei ekaa listalla!! 
    else if(searched_countries.length===1 || theCountry !== '') {
      return DisplayCountryDetails(searched_countries[0])
    } 
    else if(searched_countries.length >1 ) {
      
      //tästä pitäisi nappia painettaessa päästä ulos tuolta DisplayC..
      return searched_countries.map(p => 
        <div key={p.name}>
          {p.name}{' '}
          <button onClick={() => {
            //setCountryToSearch(p)
            console.log('Button country', p)
            // miksi tästä ei palauta näytölle tuota muokattua listaa
            // samoin kuin suoraan mennessä siihen
            // KTS 1D function that returns function kohta 
            DisplayCountryDetails(p)
            
            console.log('TheCountry after button: ', theCountry)
          }
          }>
            show
          </button>
        </div>)
    }
    else return <div>Why we ended up here ? </div>
        
    
  }

  const getSearchCountry = (event) => {
    console.log("getSearchCountry: ", event.target.value)
    return(
      setCountryToSearch(event.target.value)
      // pitäiskö tyhjentää samalla 
      //setTheCountry("")
      
    )
  }
  return (
    <div>
      find countries 
        <input value={countryToSearch}
          onChange={getSearchCountry}
          /> 
    
       <DisplayCountries/>
       <GetWeather capital={theCountry.capita}/>
       
  </div>
  )
}

export default App;
