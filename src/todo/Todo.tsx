import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/redux-index";
import TodoInput from "./TodoInput";
import { deleteTodo, checkTodo } from "../redux/modules/todo-reducer";


// export interface ITodo {
//   id: number;
//   content: string;
//   checked: boolean;
// }

const Todo = () => {
  const todoReducer = useSelector( (state: RootState) => state.todoReducer)
  const dispatch = useDispatch()

  const checkDate = () => {
    if ( String(new Date().getDate()) === localStorage.getItem('todayDate') ) return 
    
    // 오늘 날짜랑 저장된 날짜가 다르면,
    // 지금 Redux랑 오류나는듯?
      localStorage.removeItem('TodoList') // Todo 다 날린다.
      localStorage.setItem('todayDate', String( new Date().getDate() )) // 그리고 날짜도 새로 저장

      let newCalendarData = todoReducer.filter(v => v.checked  === true) // 이제 저장할 checked 된 값들과
      let oldCalenderData = JSON.parse(localStorage.getItem('savedCalendarData')!) // 이미 저장된 checked 값들을 가져와서
      let calendarDatas = newCalendarData;
      if (oldCalenderData) {
        calendarDatas = [...oldCalenderData, ...newCalendarData] // 하나의 배열로 만들어주고
      }
      localStorage.setItem('savedCalendarData', JSON.stringify(calendarDatas)) // 새로 저장해준다.
  }

  useEffect(() => { // 날짜 비교해줌
    checkDate()
  }, [])

  // useEffect(() => { // Redux에서 처리하기 때문에 필요없다.
  //   localStorage.setItem('TodoList', JSON.stringify(todoReducer))
  // }, [todoReducer])

  const checkStyle = {
    textDecoration: "line-through",
    color: "#ccc"
  }

  const todoList = todoReducer.map( v =>
    <div className="todo-memo">
      <li className= 'content' style= { v.checked ? checkStyle : undefined}
          onClick= { () => dispatch(checkTodo(v.id)) }
        > {v.content} 
      </li>
      <span className= 'del-btn' onClick= { () => dispatch(deleteTodo(v.id)) }> <i className="far fa-trash-alt"></i> </span>
    </div>
    )

  return(
    <div className='todo box'>
        <h1>What 2 Do ?</h1>
        {}
      <TodoInput />

      <div className="todo-list">
        {todoList}
      </div>
    </div>
  )
  

}

export default Todo;