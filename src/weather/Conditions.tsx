import React from "react";
import { IWDate } from './Tamperature'

interface IIcons {
  '01': string; '02': string; '03': string; '04': string; '09': string; '10': string; '11': string; '13': string; '50': string;
}

// 아이콘 모음
const icons: any = {
  '01': "fas fa-sun",
  '02': "fas fa-cloud-sun",
  '03': "fas fa-cloud",
  '04': "fas fa-cloud",
  '09': "fas fa-cloud-showers-heavy",
  '10': "fas fa-cloud-rain",
  '11': "fas fa-bolt",
  '13': "fas fa-snowflake",
  '50': "fas fa-smog"
}

const Conditions = ( { weatherData }: IWDate ) => {

  const condsUi = () => { // 날씨 UI
      let iconNum:string = weatherData.weather.icon.substr(0, 2)
      let value =
        <div className= 'conditions-ui'>
          <h2> Conditions </h2>
          <i className={icons[iconNum]} ></i>
          <div className= 'conditions-value'> {weatherData.weather.description} </div>
          {/* <img src={`https://openweathermap.org/img/wn/${weatherData.weather.icon}@2x.png`} alt="" /> */}
        </div>
      return value
  }

  return (
    <>
      {condsUi()}
    </>
  )

}
  
 export default Conditions; 
