import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  // state에 위치값 저장
  // local에 정보저장 등등
  
  
  // 위치 요청함수
  const requestCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
  }

  const handleGeoSucc = (position: any) => {
    console.log(position);
    const latitude = position.coords.latitude;  // 경도  
    const longitude = position.coords.longitude;  // 위도
    const coordsObj = {
        latitude,
        longitude
    }
    // saveCoords(coordsObj); //로컬 등등에 저장하는 함수
    // getWeather(latitude, longitude); // 날씨 받아오는 함수
  }
  const handleGeoErr = (err: any) => {
    console.log("geo err! " + err);
  }
  requestCoords()


// let API_URL_OpenWeatherMap = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=74dbeb38347e356be38594a5938cf3ea&units=metric`;
//   const getAxios = () => {
//      axios(API_URL_OpenWeatherMap)
//      .then((res) =>
//       console.log(res.data)
//       //변수에 데이터 저장 or local에 저장
//      )
//      .catch( (err) =>
//       console.log('에러:', err)
//      )
//    }


  return (
    <>
      <p>여긴 Weather 페이지 입니다</p>
    </>
  )
}

export default Weather;