import React from "react";
import { IWDate } from "./Tamperature";

const Humidity = ( { weatherData }: IWDate ) => {
  
  const humidityUi = () => {
    const value =
      <div className= 'humidity-ui'>
        <h2> Humidity </h2>
        <i className="fas fa-tint"></i>
        <div className= 'humidity-value'> {weatherData.tamp.humidity }% </div>
      </div>

    return value
  }

  return (
    <>
      { humidityUi() }
    </>
  )
}

export default Humidity;