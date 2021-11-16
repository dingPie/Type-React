import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/redux-index";
import TodoInput from "./TodoInput";
import { deleteTodo } from "../redux/modules/todo-reducer";


export interface ITodo {
  id: number;
  content: string;
  checked: boolean;
}

const Todo = () => {
  // const state = useSelector( (state: RootState) => state.todoReducer)

  let loadMemo = localStorage.getItem('TodoList')
    ? JSON.parse(localStorage.getItem('TodoList')!)
    : []

  const [todoMemo, setTodoMemo] = useState<ITodo[]>(loadMemo) // 얘는 배열로 추가되니까 타입을 추가해줌

  const checkDate = () => {
    if ( String(new Date().getDate()) !== localStorage.getItem('todayDate') ) { // 오늘 날짜랑 저장된 날짜가 다르면,
      localStorage.removeItem('TodoList') // Todo 다 날린다.
      localStorage.setItem('todayDate', String( new Date().getDate() )) // 그리고 날짜도 새로 저장

      let newCalendarData = todoMemo.filter(v => v.checked  === true) // 이제 저장할 checked 된 값들과
      let oldCalenderData = JSON.parse(localStorage.getItem('savedCalendarData')!) // 이미 저장된 checked 값들을 가져와서
      let calendarDatas = newCalendarData;
      if (oldCalenderData) {
        calendarDatas = [...oldCalenderData, ...newCalendarData] // 하나의 배열로 만들어주고
      }
      
      localStorage.setItem('savedCalendarData', JSON.stringify(calendarDatas)) // 새로 저장해준다.
    }
  }

  useEffect(() => {
    localStorage.setItem('TodoList', JSON.stringify(todoMemo)) // 바뀔때마다 local 업데이트
  }, [todoMemo])

  useEffect(() => {
    checkDate()
  }, [])

  const checkStyle = {
    textDecoration: "line-through",
    color: "#ccc"
  }
  

  const throughTodo = ( id: number ):void => {
    let newTodo = todoMemo.map(v => 
      v.id === id ? { ...v, checked: !v.checked } : v
      )

    setTodoMemo(newTodo)
  }

  const deleteTodo = ( id: number ): void => {
    let ok = window.confirm('이 할일을 삭제할까요?')
    if (ok) {
      let target = todoMemo.filter( v => v.id !== id)
      setTodoMemo(target)
  }
  }

  const todoList = todoMemo.map( v =>
    <div className="todo-memo">
      <li className= 'content' style= { v.checked ? checkStyle : undefined}
          onClick= { () => throughTodo(v.id) }
        > {v.content} 
      </li>
      <span className= 'del-btn' onClick= { () => deleteTodo(v.id) }> <i className="far fa-trash-alt"></i> </span>
    </div>
    )

  return(
    <div className='todo box'>
        <h1>What 2 Do ?</h1>
        {}
      <TodoInput todoMemo={todoMemo} setTodoMemo={setTodoMemo} />

      <div className="todo-list">
        {todoList}
      </div>
    </div>
  )
  

}

export default Todo;