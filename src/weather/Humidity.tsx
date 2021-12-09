import React from "react";
import { IWeatherData } from "./Weather";

export interface ITest {
  weatherData: IWeatherData
}

const Humidity = ( { weatherData }: ITest ) => {
  
  const humidityUi = () => {
    if (weatherData) {
      const value =
        <div className= 'humidity-ui'>
          <h2> Humidity </h2>
          <i className="fas fa-tint"></i>
          <div className= 'humidity-value'> {weatherData.tamp.humidity }% </div>

          {/* <img src={`https://openweathermap.org/img/wn/${weatherData.weather.icon}@2x.png`} alt="" /> */}
        </div>

      return value
    }
  }

  return (
    <>
      { humidityUi() }
    </>
  )
}

export default Humidity;