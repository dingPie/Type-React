import React, { Dispatch, SetStateAction, useState } from 'react';
import Todo from './todo/Todo';
import Weather from './weather/Weather';
import Calender from './calender/Calender';
import NavBar from './NavBar';

function App() {  
  const [mode, setMode] = useState('todo') //: [string, (value: string)=>void]


  return (
    <div className="App">
    
    <NavBar setMode= {setMode} mode={mode} />

    {mode === 'todo' ? <Todo />: null }
    {mode === 'weather' ? <Weather />: null }
    {mode === 'calender' ? <Calender />: null }

    </div>
  );
}

export default App;
