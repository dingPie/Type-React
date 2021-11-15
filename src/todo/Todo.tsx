import React, { useState, useEffect, useRef } from "react";
import TodoInput from "./TodoInput";


export interface ITodo {
  id: number;
  content: string;
  checked: boolean;
}

const Todo = () => {

  let loadMemo = localStorage.getItem('TodoList')
    ? JSON.parse(localStorage.getItem('TodoList')!)
    : []
  const [todoMemo, setTodoMemo] = useState<ITodo[]>(loadMemo) // 얘는 배열로 추가되니까 타입을 추가해줌

  useEffect(() => {
    localStorage.setItem('TodoList', JSON.stringify(todoMemo))
  }, [todoMemo])

  const checkStyle = {
    textDecoration: "line-through",
    color: "#ccc"
  }

  const throughTodo = ( id: number ):void => {
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
      <TodoInput todoMemo={todoMemo} setTodoMemo={setTodoMemo} />

      <div className="todo-list">
        {todoList}
      </div>
    </div>
  )
  

}

export default Todo;