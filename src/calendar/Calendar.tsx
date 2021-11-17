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

  let loadCalendar = localStorage.getItem('todoCalendar') // 매일 초기화되기 때문에 따로 저장해줌
    ? JSON.parse(localStorage.getItem('todoCalendar')!) // !는 null 이 아니다. 라고 확정해줌!
    : [{title: '초기값', start: '2000-01-01'}]

  const [calendarData, setCalendarData] = useState<IEvents[]>(loadCalendar) // 이게 있어야 events가 null이 안된다.
  const [modalData, setModalData] = useState<IEvents[] | null>(null)
  const [onModal, setOnModal] = useState(true)

  const getTodoData = ():void => {
    let target = localStorage.getItem('TodoList')
    if (target) {
      let value: ITodo[] = JSON.parse(target)
      let checked = value.filter( v => v.checked === true ) // 체크 된 것 중에
      let savedCalendarData = JSON.parse(localStorage.getItem('savedCalendarData')!) //그리고 이전에 체크로 저장된 값들 가져와서
      let calendarDatas;
      if (savedCalendarData) {
        calendarDatas = [...savedCalendarData, ...checked] // 두개 합쳐서 배열로 만들어주고
      } else {
        calendarDatas = checked
      }
      // calendar에 추가할 데이터 형태로 가공해준다.
      let content = calendarDatas.map( v => v.content )
      let year = calendarDatas.map( v => new Date(v.id).getFullYear())
      let month = calendarDatas.map( v => new Date(v.id).getMonth() + 1)
      let date = calendarDatas.map( v => new Date(v.id).getDate())

      let data = []
      for (let i = 0; i < calendarDatas.length; i ++ ) {
        data.push({ title: content[i], start: `${year[i]}-${month[i]}-${date[i]}` })
      }
      localStorage.setItem('todoCalendar', JSON.stringify(data)) // 이건 초깃값 설정을 편하게 하기위해...? 처음 useState에서 쓰이긴하는데, 사용성을 좀 더 고민해보자.
      setCalendarData(data)
    }
  }

  useEffect(() => { // 어차피 다른 페이지 다녀오면 리랜더되니까
    getTodoData()
  }, [])

  const handleDateClick = (arg: any ) => {
    let test :IEvents[] = JSON.parse(localStorage.getItem('todoCalendar')!)
    let test2 :IEvents[] = test.filter(v => v.start === arg.dateStr )
    console.log(test2)
    console.log(test)
  }

  const handleEventClick = (arg: any) => {
    let test = calendarData.filter(v => v.title === arg.event._def.title)
    let test2 = calendarData.filter(v => v.start === test[0].start )
    setOnModal(true)
    setModalData(test2)
    console.log(test2)
  }

  // useEffect(() => {
  //   setOnModal(!onModal)
  // }, [modalData])

  const test123 = () => {
    if (modalData === null) return
    let value = modalData.map( v => 
      <div> {v.title} </div>
      )
    return value
  }


  // const renderEventContent = (eventInfo:any) => {
  //   console.log(eventInfo)
  //   return (
  //     <>
  //       <i>{eventInfo.event.title}</i>
  //     </>
  //   )
  // }

  return (
    <div className='calendar box'>

      <h1> What 2 Did ? </h1>

      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        // editable= {true}
        initialView="dayGridMonth"
        eventDisplay= 'line-item'
        // headerToolbar= {{
        // center: 'dayGridMonth,timeGridWeek,timeGridDay new'
        // }}
        events= {calendarData}
        dateClick={ (arg)=> handleDateClick(arg)}
        eventClick= {(arg)=> handleEventClick(arg)}
        // eventContent= { (e)=> renderEventContent(e)}
      />

        {/* { onModal && test123() } */}
      { onModal && modalData && <EventModal modalData={modalData} setOnModal={setOnModal} /> }
      

    </div>
  )
}

export default Calendar;