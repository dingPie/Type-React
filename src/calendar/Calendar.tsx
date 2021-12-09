import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from "@fullcalendar/interaction"
import { ITodo } from '../redux/modules/todo-reducer';
import EventModal from './EventModal'

export interface IEvents {
  title: string,
  start: string
}

const Calendar = () => {

  let loadCalendar = localStorage.getItem('todoCalendar')
    ? JSON.parse(localStorage.getItem('todoCalendar')!) // 확정할당 연산자 사용
    : [{title: '초기값', start: '2000-01-01'}]

  const [calendarData, setCalendarData] = useState<IEvents[]>(loadCalendar)
  const [modalData, setModalData] = useState<IEvents[] | null>(null)
  const [onModal, setOnModal] = useState(false)

  // 현재 TodoData가 있는지 체크하는함수. 기본 State값이 local에서 바로 받아오기 때문에, 추가로 checked 된 데이터가 없다면 실행종료시킨다.
  const getTodoData = ():void => {
    let target = localStorage.getItem('TodoList')
    if (!target) return

    let checked = JSON.parse(target).filter( (v :ITodo) => v.checked === true ) // 체크 된 것 중에
    let savedCalendarData = JSON.parse(localStorage.getItem('savedCalendarData')!) //그리고 이전에 체크로 저장된 값들 가져와서
    let calendarDatas = checked;
    if (savedCalendarData) calendarDatas = [...savedCalendarData, ...checked]    // savedCalendarData가 있다면 spread 연산자로 합쳐준다.
  
    // calendar에 추가할 데이터 형태로 가공해준다.
    let data = [] // 최종데이터가 들어갈 빈 array
    let content = calendarDatas.map( (v: ITodo) => v.content )
    
    const yearData = (v: ITodo) => new Date(v.id).getFullYear()
    const monthData = (v: ITodo) => new Date(v.id).getMonth() + 1
    const dateData = (v: ITodo) => ( new Date(v.id).getDate() < 10 ) ? '0' + new Date(v.id).getDate() : new Date(v.id).getDate() // Calendar 데이터 형식에 맞춰주기 위해 10 이하에선 0을 붙여준다.
    let start = calendarDatas.map( (v: ITodo) =>`${yearData(v)}-${monthData(v)}-${dateData(v)}` )
    for (let i in calendarDatas) data.push({ title: content[i], start: start[i] })

    setCalendarData(data)
    // localStorage.setItem('todoCalendar', JSON.stringify(data))
  }

  useEffect(() => {
    getTodoData()
  }, [])
  
  const handleEventClick = (arg: any) => { // arg의 형식이 복잡해서 any 사용
    let target = calendarData.filter(v => v.title === arg.event._def.title)
    let moddalData = calendarData.filter(v => v.start === target[0].start )
    setOnModal(true)
    setModalData(moddalData)
  }


  return (
    <div className='calendar box'>

      <h1> What 2 Did ? </h1>
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        events= {calendarData}
        eventClick= {(arg)=> handleEventClick(arg)}
      />
      { onModal && modalData && <EventModal modalData={modalData} setOnModal={setOnModal} /> }
      
    </div>
  )
}

export default Calendar;