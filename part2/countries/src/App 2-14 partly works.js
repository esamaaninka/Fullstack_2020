import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'
import { queryByPlaceholderText } from '@testing-library/react';

const App = () => {
  const [ countries, setCountries] = useState([])
  const [ countryToSearch, setSearchCountry] = useState('') 
  const [ theCountry, setTheCountry] = useState([]) 

  useEffect(() => {
    //console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          console.log('promise fulfilled')
          //console.log("data: ", response.data)
          setCountries(response.data)
      })
  }, [])

  const DisplayCountryDetails = (theCountry) => {
      console.log('DisplayCountryDetails: ', theCountry)
      return (
        <div>          
        <h1>{theCountry.name}</h1>
          <p>capital {theCountry.capital}</p>
          <p>population {theCountry.population}</p>
        <h2>languages</h2>          
          <p>{theCountry.languages.map(p => <p key={p.name}>{p.name}</p>)}</p>
        <img height="70" width="140" src={theCountry.flag} alt="country flag" />
    </div>

      )
  }

  const DisplayCountries = () => {
    //console.log('DisplayCountries', countries)
    //console.log('Displayc countryToSearch: ', countryToSearch)
    var searched_countries=countries.filter(c => c.name.toLowerCase()
                          .includes(countryToSearch.toLowerCase()))
    
    // setTheCountry ei toimi  - jos heti antaa FIN hakuun -> core
    // jos lisasta valitsee show, ei päivity näkymä ja jos eka
    // kierroksella jatkaa kentän syöttöä s.e tulee vain 1 maa -> core
    // tulee jos ei paina nappia välissä. Jos Listassa painaa show nappia, 
    // ei päivity tuo setTheCountryllä, jos kirjoittaa täyteen hakukentässä 
    // niin tulostaa ja tuo theCountry on saanut oikean maan ???                       

    console.log('Length: ', searched_countries.length)
    if(searched_countries.length > 10) return <div>Search criteria too wide</div>
    else if(searched_countries.length===0) return <div>No countries found with given criteria</div>
    else if(searched_countries.length >1 ) {
      // laita BUTTON tilale päivitys country
      return searched_countries.map(p => 
        <p key={p.name}>
          {p.name}{' '}
          <button onClick={() => {
            console.log('Button country', p)
            // tämä ei toimi, ei aseta tuota maata
            setTheCountry(p)
            return DisplayCountryDetails(p)
          }
          }>
            show
          </button>
        </p>)
    }
    
    // laita tämä maanäyttö omaksi funktiokseen, aseta tässä kohtaa
    // maavalinta ja kutsu näyttöä ?!
    if(searched_countries.length===1) {
      // hmm... miksi setTheCountry ei toimi, palauttaa undefined. Tulee tosin 2x tähän?
      setTheCountry(searched_countries[0])
      //console.log("setTheCountry returned: ", theCountry)
      console.log('TheCountry found: ', theCountry)
    }
    if(theCountry) {  
      console.log("theCountry to display ", theCountry)
      return DisplayCountryDetails(theCountry)
      /*
      return (
        <div>          
            <h1>{theCountry.name}</h1>
              <p>capital {theCountry.capital}</p>
              <p>population {theCountry.population}</p>
            <h2>languages</h2>          
              <p>{theCountry.languages.map(p => <p key={p.name}>{p.name}</p>)}</p>
            <img height="70" width="140" src={theCountry.flag} alt="country flag" />
        </div>
      )*/
    }
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
