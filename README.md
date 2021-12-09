# Todo List With TS & React

## 프로젝트 개요
- TypeScript의 사용을 위한 Todo 앱 제작
- OPEN API의 비동기 통신 활용
- TypeScript - Redux를 활용하여 데이터의 사용
- TodoList에서 클리어한 내용을 Calendar에 저장해주는 기능 구현 

<br><br>

## 사용된 기술

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=black">
<img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=Sass&logoColor=black">

<br>

- "openweathermap" 날씨정보 API
- "fullCalendar" 캘린더 모듈

<br>


## Todo List

|Todo 화면 |
|---|
| <img src='https://user-images.githubusercontent.com/82368684/143793734-ba9fedff-ab86-46ef-b406-1fdb6f6c5c8a.png' width= '400px'> |

<br>

- localStorage 에서 데이터가 관리됩니다.
- id는 `new Date()` 값으로 적용되며, 이는 Calender 에서 활용합니다.
- id의 Date값을 비교하여, 날짜가 넘어가면 Todo를 리셋해줍니다.
- 리셋할 때 만약 Todo를 체크해놨다면, Calendar쪽에 추가해줍니다.

<br>

## Weather

|Weather 화면 |
|---|
| <img src='https://user-images.githubusercontent.com/82368684/143793808-8af51956-2266-47f6-bcc7-2525e7f684ef.png' width= '400px'> |

<br>

- API  `openweathermap` 을 활용하여 제작했습니다.
- 현재 위치를 허용할 경우, 온도와 날씨상태, 습도 세 가지 데이터를 받아서 보여줍니다.


<br>

## Calendar

<br>

| Calendar 화면 | Calendar Modal |
|---|---|
| <img src='https://user-images.githubusercontent.com/82368684/143793857-60b36072-6105-49c1-a2b8-49f456fd4c2e.png' width= '300px'> | <img src='https://user-images.githubusercontent.com/82368684/143793859-a94e5683-31ba-49eb-b3cf-568104ce8dee.png' width= '300px'> |

<br>

- `fullCalendar` Module 을 사용하여 제작되었습니다.
- 기존 Todo List에서 완료 체크한 데이터를 저장하여 Calendar에 띄워줍니다.
- 띄워진 Event를 클릭시, 잘린 글자없이 확대하여 Modal창으로 보여줍니다.
