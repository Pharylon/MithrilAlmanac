import React, { useState } from "react";
import { observer } from "mobx-react";
import EditCalendarState from "../../State/EditCalendarState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckSquare, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";

const CalendarEditDay = observer((props: { dayIndex: number }) => {
  const [modalOpen, setModalOpen] = useState(false);
  function updateDayOfTheWeek(newVal: string) {
    EditCalendarState.calendar.daysOfWeek[props.dayIndex] = newVal;
  }
  const dayVal = EditCalendarState.calendar.daysOfWeek[props.dayIndex];
  return (
    <div className="edit-day-line">
      {
        EditCalendarState.dayEditPosition !== props.dayIndex ?
          (<div>{dayVal}</div>) :
          (<input type="text" value={dayVal} onChange={(e) => updateDayOfTheWeek(e.target.value)} />)
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
                onClick={() => EditCalendarState.dayEditPosition = undefined} />
            </div>
          )
      }
      {/* <input type="text" value={day} onChange={(e) => updateDayOfTheWeek(e.target.value, i)} /> */}
      <Modal className="modal-wrapper" isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <div className="standard-modal-inner danger-modal">
          <div>{`Are you sure you want to delete ${dayVal}?`}</div>
          <div>
            <button>Delete</button>
            <button>Never mind</button>
          </div>
        </div>
      </Modal>
    </div>
  );
});

export default CalendarEditDay;
