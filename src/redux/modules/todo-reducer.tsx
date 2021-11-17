import React from "react";

//타입지정 인터페이스
export interface ITodo {
  id: number;
  content: string;
  checked: boolean;
}

// 초기값설정용 load할 메모
let loadMemo = localStorage.getItem('TodoList')
  ? JSON.parse(localStorage.getItem('TodoList')!)
  : []

// 메모 Todo 추가시 전달하는 데이터와 함수
export const addTodo = (content :string) => ({
  type: 'addTodo',
  data: { id: Date.now(), content: content, checked: false }
});
// 메모 삭제시...
export const deleteTodo = (id :number) => ({
  type: 'deleteTodo',
  data: { id: id },
})
// 체크 on / off시...
export const checkTodo = (id :number) => ({
  type: 'checkTodo',
  data: { id: id},
})

type TypeAction =
  // | ReturnType<typeof addTodo>
  // | ReturnType<typeof deleteTodo>
  // | ReturnType<typeof checkTodo>;
  | { type: 'addTodo';  data: ITodo}
  | { type: 'deleteTodo';  data: ITodo}
  | { type: 'checkTodo';  data: ITodo}

  // 저장 및 로드함수
  const saveAndload = (data : ITodo[]):ITodo[] => {
    localStorage.setItem('TodoList', JSON.stringify(data))
    let newTodo = JSON.parse(localStorage.getItem('TodoList')! ) // 위에서 추가해 줬으니 무조건 있다.
    return newTodo
  }

const todoReducer = ( state: ITodo[] = loadMemo, action: TypeAction): ITodo[] => {
  switch (action.type) {
    
    case 'addTodo': 
      let newData: ITodo[] = [...state, action.data]
      saveAndload(newData)
      return newData
    
    case 'deleteTodo':
      let deletedTodo: ITodo[] = state.filter(v => v.id !== action.data.id)
      saveAndload(deletedTodo)
      return deletedTodo

    case 'checkTodo':
      let checkedTodo = state.map( v => v.id === action.data.id ? {...v, checked: !v.checked} : v  )
      saveAndload(checkedTodo)
      return checkedTodo
      
    default:
      return state;
  }
}

export default todoReducer