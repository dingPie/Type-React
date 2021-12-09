import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Temperature from './Tamperature';
import Conditions from './Conditions';
import Humidity from './Humidity';

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
  const [API_URL, setAPI_URL] = useState("")
  const [weatherData, setWeatherData] = useState<IWeatherData | null>(null)

  // 위치 요청함수
  const requestCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
  }
  // 요청 성공시
  const handleGeoSucc = (position: any) => {
    const lat = position.coords.latitude;  // 경도  
    const lon = position.coords.longitude;  // 위도
    setAPI_URL(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=74dbeb38347e356be38594a5938cf3ea&units=metric`)
    // 배포시? 일부 브라우저에서 작동안함 /api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=74dbeb38347e356be38594a5938cf3ea&units=metric
  }
  // 요청 실패시
  const handleGeoErr = (err: any) => {
    console.log("geo err! " + err);
  }

  // Axios로 openweathermap를 요청하는 함수
  const getData = async () => {
    const config = {
    headers: {
      'Accept': 'application/json'
    }}
    
    try {
      const res = await axios.get(API_URL, config)
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
        setWeatherData(weatherObj);
    } catch (err) {
      console.log('에러:', err)
    }

   }

   useEffect(() => {
    requestCoords() // 시작할때 위치데이터를 요청하고
    if (API_URL !== '') { // URL 위치를 받아온 이후 데이터 요청 실행
      getData();
    }
  }, [API_URL])


  return (
    <div className='weather box'>
      <h1>Weather</h1>

      <div className="weather-ui">
        { weatherData 
          ? <>
              <Temperature weatherData= {weatherData} />
              <Conditions weatherData= {weatherData} />
              <Humidity weatherData= {weatherData} />
            </>
          : <h1> 위치 정보를 받아올 수 없습니다. </h1>
        }
      </div>
    </div>
  )
}

export default Weather;


  
  // 기존 ajax 호출

  //  const getData = () => {
  //    const config = {
  //     headers: {
  //       'Accept': 'application/json'
  //     }}

  //   fetch(API_URL, config)
  //     .then((res) => {
  //       if (!res.ok) throw new Error ('에러남')
  //       return res.json()
  //     })
  //     .then((data) => {
  //     let weatherObj = {
  //       weather: {
  //         main: data.weather[0].main,
  //         description: data.weather[0].description,
  //         icon: data.weather[0].icon
  //       },
  //       tamp: { 
  //         now: data.main.temp,
  //         humidity: data.main.humidity
  //       }
  //     }
  //     console.log(weatherObj)
  //     setWeatherData(weatherObj);
  //     })
  //     .catch( (err) =>
  //     console.log('에러:', err)
  //     )
  //   }
