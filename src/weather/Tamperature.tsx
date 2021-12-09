import React from "react";
import { IWeatherData } from "./Weather";

export interface IWDate {
  weatherData: IWeatherData
}

const Temperature = ( { weatherData }: IWDate ) => {

  const tempUi = () => { 
    let value =
      <div className= 'temp-ui'>
        <h2> Temparture </h2>
        <i className="fas fa-temperature-low"></i>
        <div> {weatherData.tamp.now.toFixed(1)}℃</div>
      </div>
    return value
  }


  return (
    <>
      { tempUi() }
    </>
  )
}

export default Temperature;