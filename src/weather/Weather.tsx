import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Temperature from './Tamperature';

export interface IWeatherData {
  weather: IWeather, tamp: ITamp
}
export interface IWeather {
  main: string, description: string, icon: string
}
export interface ITamp {
  now: number, humidity: number
}

const Weather = () => {
  const [API_URL, setAPI_URL] = useState('')
  const [weatherData, setWeatherData] = useState<IWeatherData | null >(null)

  // 위치 요청함수
  const requestCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
  }
  // 요청 성공시
  const handleGeoSucc = (position: any) => {
    const lat = position.coords.latitude;  // 경도  
    const lon= position.coords.longitude;  // 위도
    setAPI_URL(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=74dbeb38347e356be38594a5938cf3ea&units=metric`)
    // getWeather(latitude, longitude); // 날씨 받아오는 함수
  }
  // 요청 실패시
  const handleGeoErr = (err: any) => {
    console.log("geo err! " + err);
  }

  // Axios로 openweathermap를 요청하는 함수
  const getAxios = () => {
     axios(API_URL)
     .then((res) => {
      console.log(res.data);
      let weatherObj = {
        weather: {
          main: res.data.weather[0].main,
          description: res.data.weather[0].description,
          icon: res.data.weather[0].icon
        },
        tamp: { 
          now: res.data.main.temp,
          humidity: res.data.main.humidity
        }
      }
      console.log(weatherObj)
      setWeatherData(weatherObj);
     })
     .catch( (err) =>
      console.log('에러:', err)
     )
   }

   useEffect(() => {
    requestCoords() // 시작할때 위치데이터를 요청하고
    console.log(weatherData)
    if (API_URL !== null) { // 요청한 데이터를 실행한다.
      getAxios()
    }
  }, [API_URL])
// let API_URL_OpenWeatherMap = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=74dbeb38347e356be38594a5938cf3ea&units=metric`;

  const icons:any = { // 여긴 매개변수를 넣어주니 any를 써야될수밖에 없나..?
    '01': "fas fa-sun",
    '02': "fas fa-cloud-sun",
    '03': "fas fa-cloud",
    '09': "fas fa-cloud-showers-heavy",
    '10': "fas fa-cloud-rain",
    '11': "fas fa-bolt",
    '13': "fas fa-snowflake",
    '50': "fas fa-smog"
}

// 여긴 추후 컴포넌트로 분리하자.
const tempUi = () => { // 온도 UI
  if (weatherData) {
    let value =
      <div className= 'temp-ui'>
        <h2> Temparture </h2>
        <i className="fas fa-temperature-low"></i>
        <div className= 'temp-value'> {weatherData.tamp.now.toFixed(1)}℃</div>
      </div>
  return value
  }
}

const conditionsUi = () => { // 날씨 UI
  if (weatherData) {
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
}

const humidityUi = () => { // 습도 UI
  if (weatherData) {
    let value =
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
    <div className='weather box'>
      <h1>Weather</h1>

      <div className="weather-ui">

        { tempUi() }
        { conditionsUi() }
        { humidityUi() }
        { weatherData === null
          ? <h1> 위치 정보를 받아올 수 없습니다. </h1>
          : null
        }
      </div>
      {/* { weatherData !== null
        ? <Temperature weatherData= {weatherData} /> //버그나네
        : null
      } */}
      </div>
  )
}

export default Weather;