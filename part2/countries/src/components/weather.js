import React from 'react';
import useEffect from 'react';
import axios from 'axios'

const GetWeather = (capital) => {
   // useEffect(() => {
      console.log('The Weather at: ', capital)
      let wdata = 'test'
      const API_key='59b78142d618459a21c982b7a368a0f8'

      const request = axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${API_key}`)
      return request.then(response => {
        return(
          <div>
            {console.log('wdata: ', response.data)}
            <p>wheather in {response.data.name} </p>
          </div> )
      })
  /*
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${API_key}`)
        .then(response => {
          
        // console.log('Response: ',JSON.stringify(response.data))
          wdata = JSON.parse(JSON.stringify(response.data))
          console.log('wdata: ', wdata)
          console.log('weather in: ', response.data.name, response.data.main.temp, response.data.wind)
          // menee hullunlooppiin
          //setTheWheather(response.data)
          return (
            <div>
              {console.log('wdata: ', wdata)}
              <p>wheather in {wdata.name} </p>
            </div>
          )
        })
      */
      //},[])    
       
       // return(
        ////  {//console.log('wdata: ', wdata)}
//}
//            wheather in {wdata}
//          </div>
//        )
    }

    export default GetWeather