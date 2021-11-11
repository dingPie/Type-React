import React, { useState } from "react";
import { Itodo } from "./Todo";

export interface ITodoList {
  todoMemo: Itodo[],
  setTodoMemo: ( list:  Itodo[]) => void;
}

const TodoInput = ( {todoMemo,setTodoMemo}:ITodoList ) => {
  const [inputMemo, setInputMemo] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setInputMemo(e.target.value)
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputMemo === '') return
    let newMemo = { id: Date.now(), content: inputMemo, checked: false }
    setTodoMemo( [...todoMemo, newMemo])
    setInputMemo('')
    console.log('submit됨')
  }

  return (
    <form onSubmit= {(e) => onSubmit(e)}>
      <input type="text" value ={inputMemo}
        onChange= {(e) => onChange(e)}
      />
      <input type="submit" value=" + " />
    </form>
  )
}

export default TodoInput;