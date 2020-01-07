import React, { useState } from "react";
import { observer } from "mobx-react";
import EditCalendarState from "../../State/EditCalendarState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckSquare, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import UserState from "../../State/UserState";
import ErrorState from "../../State/ErrorState";

const CalendarEditDay = observer((props: { dayIndex: number }) => {
  const [dayName, setDayName] = useState(EditCalendarState.calendar.daysOfWeek[props.dayIndex]);
  const [modalOpen, setModalOpen] = useState(false);
  function updateDayOfTheWeek() {
    const duplicates = EditCalendarState.calendar.daysOfWeek.some((x, i) => x === dayName && i !== props.dayIndex);
    if (duplicates){
      console.log("DUP!");
      ErrorState.errorMessage = "A day with that name already exists";
    }
    else{
      EditCalendarState.calendar.daysOfWeek[props.dayIndex] = dayName;
      EditCalendarState.dayEditPosition = undefined;
    }    
  }
  function deleteDay(){
    const newDays = [...EditCalendarState.calendar.daysOfWeek];
    newDays.splice(props.dayIndex, 1);
    EditCalendarState.calendar.daysOfWeek = newDays;
    EditCalendarState.dayEditPosition = undefined;
  }
  return (
    <div className="edit-day-line">
      {
        EditCalendarState.dayEditPosition !== props.dayIndex ?
          (<div>{dayName}</div>) :
          (<input type="text" value={dayName} onChange={(e) => setDayName(e.target.value)} />)
      }
      {
        EditCalendarState.dayEditPosition !== props.dayIndex ?
          (
            <div>
              <FontAwesomeIcon icon={faEdit} onClick={() => EditCalendarState.dayEditPosition = props.dayIndex} />
            </div>
          ) :
          (
            <div>
              <FontAwesomeIcon
                className="fa-cancel"
                icon={faTimesCircle} 
                onClick={() => setModalOpen(true)} />
              <FontAwesomeIcon 
              className="fa-check"
                icon={faCheckSquare} 
                onClick={() => updateDayOfTheWeek()} />
            </div>
          )
      }
      {/* <input type="text" value={day} onChange={(e) => updateDayOfTheWeek(e.target.value, i)} /> */}
      <Modal className="modal-wrapper" isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <div className="standard-modal-inner danger-modal">
          <div>{`Are you sure you want to delete ${dayName}?`}</div>
          <div className="delete-day-buttons">
            <button onClick={() => deleteDay()} className="danger-button">Delete</button>
            <button onClick={() => setModalOpen(false)} className="blue-button">Never mind</button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default CalendarEditDay;
