import React from "react";
import { IWeatherData } from "./Weather";

export interface ITest {
  weatherData: IWeatherData
}

const Temperature = ( { weatherData }: ITest ) => {
  const tempUi = () => { 
    if (weatherData) {
      let value =
        <div className= 'temp-ui'>
          <h2> Temparture </h2>
          <i className="fas fa-temperature-low"></i>
          <div> {weatherData.tamp.now.toFixed(1)}℃</div>
        </div>
    return value
    }
  }
  return (
    <>
      { tempUi() }
    </>
  )
}

export default Temperature;