import { type } from "os";
import React from "react";
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { ITodo } from '../../todo/Todo';

// export interface ITodo {
//   id: number;
//   content: string;
//   checked: boolean;
// }


let loadMemo = localStorage.getItem('TodoList')
  ? JSON.parse(localStorage.getItem('TodoList')!)
  : []

export const addTodo = (content :string) => ({
  type: 'addTodo',
  data: { id: Date.now(), content: content, checked: false }
});

export const deleteTodo1 = (id :number) => ({
  type: 'deleteTodo',
  data: { id: id },
})

export const checkTodo = (id :number) => ({
  type: 'checkTodo',
  data: { id: id},
})

interface Idata {
  id:number;
  content: string;
  checked: boolean;
}

type TypeAction =
  // | ReturnType<typeof addTodo>
  // | ReturnType<typeof deleteTodo>
  // | ReturnType<typeof checkTodo>;
  | { type: 'addTodo';  data: Idata}
  | { type: 'deleteTodo';  data: Idata}
  | { type: 'checkTodo';  data: Idata}

  // type TTest = ITodo[]; 

  const saveAndload = (data : ITodo[]):ITodo[] => {
    localStorage.setItem('TodoList', JSON.stringify(data))
    let newTodo = JSON.parse(localStorage.getItem('TodoList')! ) // 위에서 추가해 줬으니 무조건 있다.
    return newTodo
  }

const todoReducer = ( state: ITodo[] = loadMemo, action: TypeAction) :ITodo[] => {

  switch (action.type) {
    
    case 'addTodo': 
      let newData: ITodo[] = [...state, action.data]
      saveAndload(newData)
      console.log(state, typeof state)
      return newData
    
    case 'deleteTodo':
      let deletedTodo: ITodo[] = state.filter(v => v.id !== action.data.id)
      saveAndload(deletedTodo)
      console.log(state)
      return deletedTodo

    case 'checkTodo':
      let checkedTodo = state.map( v => v.id === action.data.id ? {...v, checked: !v.checked} : v  )
      saveAndload(checkedTodo)
      console.log(state)
      return checkedTodo
      
    default:
      return state;
  }
}

export default todoReducer