import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import { ITodo } from '../todo/Todo';

interface IEvents {
  title: string,
  start: string
}

const Calendar = () => {
  const [calendarData, setCalendarData] = useState<IEvents[]>([{title: '초기값', start: '2000-01-01'}]) // 이게 있어야 events가 null이 안된다.
  // const [events, setEvents] = useState<IEvents[] | null>(null)

  const getTodoData = ():void => {
  let target = localStorage.getItem('TodoList')
  if (target) {
    let value: ITodo[] = JSON.parse(target)
    let checked = value.filter(v => v.checked === true)
    let content =checked.map( v => v.content)
    let year = checked.map(v => new Date(v.id).getFullYear())
    let month = checked.map(v => new Date(v.id).getMonth() + 1)
    let date = checked.map(v => new Date(v.id).getDate())

    let calendarData = []
    for (let i = 0; i < checked.length; i ++ ) {
      calendarData.push({title: content[i], start: `${year[i]}-${month[i]}-${date[i]}` })
    }
    setCalendarData(calendarData)
  }}
  // todo 들을 Redux로 관리해서 여기 쏴줄까

    useEffect(() => { // 어차피 다른 페이지 다녀오면 리랜더되니까
      getTodoData()
    }, [])

 const handleDateClick = (arg:any) => { // bind with an arrow function
    alert(arg.dateStr)
  }
  // const events = [ // Local에 저장 된 값을 이용하자.
  //   {
  //     title: 'event 1',
  //     start: '2021-11-14',
  //   },
  // ];


  function renderEventContent(eventInfo:any) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  return (
    <>
      <p>여긴 Calendar 페이지 입니다</p>

      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        // headerToolbar={{
        //   center: 'dayGridMonth,timeGridWeek,timeGridDay new'
        // }}
        events= {calendarData}
        dateClick={ (arg)=> handleDateClick(arg)}
        eventContent={ (eventInfo)=> renderEventContent(eventInfo)}
      />
    </>
  )
}

export default Calendar;