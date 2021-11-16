import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../redux/modules/todo-reducer";
import { ITodo } from "./Todo";


export interface ITodoList {
  todoMemo: ITodo[],
  setTodoMemo: ( list:  ITodo[]) => void;
}

const TodoInput = ( {todoMemo, setTodoMemo}:ITodoList ) => {
  const dispatch = useDispatch()
  
  const [inputMemo, setInputMemo] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputMemo(e.target.value)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputMemo === '') return
    let newMemo = { id: Date.now(), content: inputMemo, checked: false }
    setTodoMemo( [...todoMemo, newMemo])
    dispatch(addTodo(inputMemo))
    setInputMemo('')
  }

  return (
    <form onSubmit= {(e) => onSubmit(e)} className='input-box'>
      <input type="text" value ={inputMemo} className='input' placeholder='Write down what to do...'
        onChange= {(e) => onChange(e)}
      />
      <input type="submit" value="+" className='btn' />
    </form>
  )
}

export default TodoInput;