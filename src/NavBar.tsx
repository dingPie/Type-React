import React from "react";

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
      <button onClick= {() => setMode('todo')}> Todo List </button>
      <button onClick= {() => setMode('weather')}> Weather </button>
      <button onClick= {() => setMode('calender')}> Calender </button>
    </div>

    {mode}
    </>
  )
}
export default NavBar