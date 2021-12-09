import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/modules/todo-reducer";


const TodoInput = ( ) => {
  const dispatch = useDispatch()
  
  const [inputMemo, setInputMemo] = useState('')

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputMemo === '') return
    dispatch(addTodo(inputMemo)) // Redux에 있는 Todo 로 전달
    setInputMemo('')
  }

  return (
    <form onSubmit= {(e) => onSubmit(e)} className='input-box'>
      <input type="text" value ={inputMemo} className='input' placeholder='Write down what to do...'
        onChange= {(e) => setInputMemo(e.target.value)
        }
      />
      <input type="submit" value="+" className='btn' />
    </form>
  )
}

export default TodoInput;