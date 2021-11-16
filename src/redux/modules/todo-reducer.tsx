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
  data: { id: Date.now(), content: content, checked: false },
});

export const deleteTodo = (content :string) => ({
  type: 'deleteTodo',
  data: { id: Date.now(), content: content, checked: false },
})

export const checkTodo = (content :string) => ({
  type: 'checkTodo',
  data: { id: Date.now(), content: content, checked: false },
})


type TypeAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof deleteTodo>
  | ReturnType<typeof checkTodo>;
  // | typeof addTodo 
  // | typeof deleteTodo
  // | typeof checkTodo

  // type TTest = ITodo[]; 

const todoReducer = ( state: ITodo = loadMemo, action: TypeAction):ITodo => {

  switch (action.type) {
    
    case 'addTodo': // case 라고 입력하고 Ctrl + Space 를 누르면 어떤 종류의 action.type들이 있는지 확인 할 수 있습니다.
    // 음 ITodo가 list 형식이 아니라, map, filter가 사용불가...
      localStorage.setItem('TodoList', JSON.stringify([state, action.data]))
      console.log(state, typeof state)
      return state
    
    case 'deleteTodo':
      // let test = state.filter(v => v.id !== action.data.id)
      console.log(state)
      return state

    case 'checkTodo':
      console.log(state)
      return state
      
    default:
      return state;
  }
}

export default todoReducer