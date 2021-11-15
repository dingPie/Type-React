import React, { Dispatch, SetStateAction, useState } from 'react';
import Todo from './todo/Todo';
import Weather from './weather/Weather';
import Calendar from './calendar/Calendar';
import NavBar from './NavBar';

function App() {  
  const [mode, setMode] = useState('todo') //: [string, (value: string)=>void]

  const backgroundColor:any = {
    'todo': '#ffbe32',
    'weather': '#039be5',
    'calendar': '#81c784'
  }

  return (
    <div className="App" style={{ background: backgroundColor[mode]}}>
    
      <div className="main-box">
        <NavBar setMode= {setMode} mode={mode} />

        {mode === 'todo' ? <Todo />: null }
        {mode === 'weather' ? <Weather />: null }
        {mode === 'calendar' ? <Calendar />: null }
      </div>
    </div>
  );
}

export default App;
