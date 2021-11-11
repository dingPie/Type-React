import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface IWeatherData {
  weather: IWeather, tamp: ITamp
}
interface IWeather {
  main: string, description: string, icon: string
}
interface ITamp {
  now: number, min: number, max: number, humidity: number
}

const Weather = () => {
  const [API_URL, setAPI_URL] = useState('')
  const [weatherData, setWeatherData] = useState<IWeatherData | null >(null)

  // 위치 요청함수
  const requestCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
  }

  const handleGeoSucc = (position: any) => {
    const lat = position.coords.latitude;  // 경도  
    const lon= position.coords.longitude;  // 위도
    setAPI_URL(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=74dbeb38347e356be38594a5938cf3ea&units=metric`)
    // getWeather(latitude, longitude); // 날씨 받아오는 함수
  }
  const handleGeoErr = (err: any) => {
    console.log("geo err! " + err);
  }

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
          min: res.data.main.temp_min,
          max: res.data.main.temp_max,
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
    requestCoords()
    if (API_URL !== '') {
      getAxios()
    }
  }, [API_URL])
// let API_URL_OpenWeatherMap = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=74dbeb38347e356be38594a5938cf3ea&units=metric`;

let testFunc =() => {
  if (weatherData) {
    let test =
      <div>
        <li>날씨: {weatherData.weather.main}</li>
        <li>설명: {weatherData.weather.description}</li>
        <img src={`https://openweathermap.org/img/wn/${weatherData.weather.icon}@2x.png`} alt="" />
        <li>지금온도: {weatherData.tamp.now}</li>
        <li>지금최고온도: {weatherData.tamp.max}</li>
        <li>지금최저온도: {weatherData.tamp.min}</li>
        <li>습도: {weatherData.tamp.humidity}</li>
      </div>
  return test
  }
}
  return (
    <>
      <p>여긴 Weather 페이지 입니다</p>

      { testFunc() }

    </>
  )
}

export default Weather;