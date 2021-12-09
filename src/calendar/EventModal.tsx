import React from "react";
import { IEvents } from "./Calendar";

interface IEventModal {
  modalData: IEvents[] | null
  setOnModal: (v : boolean) => void;
}

const EventModal = ( {modalData, setOnModal} :IEventModal ) => {


  return (
    <div className= 'modal-box'>
      
      <button className='x-btn' onClick= { () => setOnModal(false)}> x </button>

      { modalData &&
        modalData.map( v => 
          <div className='title'> {v.title} </div>
        )
      }
    </div>
  )
}

export default EventModal