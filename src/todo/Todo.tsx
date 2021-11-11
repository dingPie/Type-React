import React, { useState, useEffect, useRef } from "react";
import TodoInput from "./TodoInput";


export interface Itodo {
  id: number;
  content: string;
  checked: boolean;
}

const Todo = () => {

  let loadMemo = localStorage.getItem('TodoList')
    ? JSON.parse(localStorage.getItem('TodoList')!)
    : []
  const [todoMemo, setTodoMemo] = useState<Itodo[]>(loadMemo) // 얘는 배열로 추가되니까 타입을 추가해줌

  useEffect(() => {
    localStorage.setItem('TodoList', JSON.stringify(todoMemo))
  }, [todoMemo])

  const checkStyle = {
    textDecoration: "line-through",
    color: "#ccc"
  }

  const throughTodo = ( id: number ):void => {
    let target = todoMemo.filter( v => v.id === id)[0]
    console.log(target)
    let newTodo = todoMemo.map(v => 
      v.id === id ? { ...v, checked: !v.checked } : v
      )
    console.log(todoMemo)
    setTodoMemo(newTodo)
  }

  const deleteTodo = ( id: number ): void => {
    let ok = window.confirm('이 할일을 삭제할까요?')
    if (ok) {
      let target = todoMemo.filter( v => v.id !== id)
      console.log(target)
      setTodoMemo(target)
  }
  }

  const todoList = todoMemo.map( v =>
    <div className="todo">
      <input type="checkbox" className= 'check-btn' onClick= { () => throughTodo(v.id)} />
      <li className= 'content' style= { v.checked ? checkStyle : undefined}
        > {v.content} 
      </li>
      <span className= 'del-btn' onClick= { () => deleteTodo(v.id) }> 삭제 </span>
    </div>
    )


  return(
    <>
    <p> 여기는 todo 페이지 입니다.</p>

    <TodoInput todoMemo={todoMemo} setTodoMemo={setTodoMemo} />

    {todoList}

    </>
  )
  

}

export default Todo;