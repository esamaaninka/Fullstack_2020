import React from 'react';
import axios from 'axios'
const GetWeather = (capital) => {
    //useEffect(() => {
      console.log('The Weather at: ', capital)
      let wdata = 'test'
      const API_key='59b78142d618459a21c982b7a368a0f8'
  
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${API_key}`)
        .then(response => {
          
  //        console.log(JSON.stringify(response.data))
          wdata = JSON.parse(JSON.stringify(response.data))
          console.log('wdata: ', response.data)
          // menee hullunlooppiin
          //setTheWheather(response.data)
          
        })
      
    //  },[])    
       
        return(
          <div>
            {console.log('wdata: ', wdata)}
            wheather in {capital}
          </div>
        )
    }

    export default getWeather