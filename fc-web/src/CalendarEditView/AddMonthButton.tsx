import React, { useState } from "react";
import { observer } from "mobx-react";
import Modal from "react-modal";
import EditCalendarState from "../State/EditCalendarState";
import Month from "../Models/Month";

const AddMonth = observer((props: {newPosition: number}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("My Month");
  const [numberOfDays, setNumberOfDays] = useState(30);
  function safeSetNumberOfDays(newValue: string){
    const asInt = parseInt(newValue, 10);
    if (asInt){
      setNumberOfDays(asInt);
    }
  }
  function addMonth(){
    const newMonth: Month = {
      name,
      days: numberOfDays,
      position: props.newPosition,
    };
    EditCalendarState.calendar.months.push(newMonth);
    setName("");
    setNumberOfDays(30);
    setModalOpen(false);
  }
  return (
    <div>
      <button onClick={() => setModalOpen(true)} className="blue-button">Add Month</button>
      <Modal
            className="modal-wrapper"
            isOpen={modalOpen}
            onRequestClose={() => setModalOpen(false)}>
            <div className="standard-modal-inner sm">
              <h2>Add Month</h2>
              <div className="input-combo bk">
                <label htmlFor="new-month-name">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
              </div>
              <div className="input-combo bk">
                <label htmlFor="new-month-name">Number of Days</label>
                <input type="number" value={numberOfDays} onChange={(e) => safeSetNumberOfDays(e.target.value)}/>
              </div>
              <button className="add-month-button blue-button" onClick={() => addMonth()}>Add</button>
            </div>
      </Modal>
    </div>
  );
});

export default AddMonth;
