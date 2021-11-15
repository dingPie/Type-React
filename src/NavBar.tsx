import React from "react";
import './style/style.scss'

interface NavProps {
  setMode: (value: string) => void;
  mode: string;
}

const NavBar = ({ setMode, mode }:NavProps ) => {
  
  const onClick = (v: string): void => {
    setMode(v)
  }

  return (
    <>
      <div className="nav-box">
        <div className='set-todo-btn' onClick= {() => setMode('todo')}> Todo List </div>
        <div className='set-weather-btn' onClick= {() => setMode('weather')}> Weather </div>
        <div className='set-calender-btn' onClick= {() => setMode('calendar')}> Calender </div>
      </div>
    </>
  )
}
export default NavBar