import React, { useState, useRef } from "react";


const Todo = () => {
  const [inputMemo, setInputMemo] = useState('')
  const [todoMemo, setTodoMemo] = useState<string[]>([]) // 얘는 배열로 추가되니까 타입을 추가해줌

  // const contentCheck ={
  //   textDecoration: checked ? "line-through" : null,
  //   color: checked ? "#ccc" : "#000",
  // }

  const throughTodo = (e: React.MouseEvent<HTMLElement> ):void => {
    console.log('삭선긋기!')


  }

  const deleteTodo = (): void => {
    console.log('삭제하기, 필터로 하면 될듯?')
  }

  const todoList = todoMemo.map( v =>
    <div className="todo">
      <input type="checkbox" className= 'check-btn' onClick= {throughTodo} />
      <li className= 'content'> {v} </li>
      <span className= 'del-btn' onClick= {deleteTodo}> 삭제 </span>
    </div>
    )


  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setInputMemo(e.target.value)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setTodoMemo( [...todoMemo, inputMemo])
    setInputMemo('')
    console.log('submit됨')
  }


  return(
    <>
    <p> 여기는 todo 페이지 입니다.</p>

    <form onSubmit= {(e) => onSubmit(e)}>
      <input type="text" value ={inputMemo}
       onChange= {(e) => onChange(e)}
       />
      <input type="submit" value=" + " />
    </form>

    {todoList}

    </>
  )
  

}

export default Todo;