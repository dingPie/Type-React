import React from "react";
import { IWeatherData } from "./Weather";

const Temperature = ( weatherData: IWeatherData ) => {
  const tempUi = () => { 
    if (weatherData) {
      let value =
        <div className= 'temp-ui'>
          <p> Temparture </p>
          <i className="fas fa-temperature-low"></i>
          <div> {weatherData.tamp.now.toFixed(1)}℃</div>
        </div>
    return value
    }
  }
  return (
    <>
    { tempUi }
    </>
  )
}

export default Temperature;