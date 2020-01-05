import React, { useState } from "react";
import { observer } from "mobx-react";
import { Holiday, getDateString } from "../Models/FantasyDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import EditCalendarState from "../State/EditCalendarState";
import Modal from "react-modal";
import HolidayEditDialog from "./HolidayEditDialog";

const MyComponent = observer((props: { holiday: Holiday }) => {
  const [modalOpen, setModalOpen] = useState(false);
  function updateHoliday(holiday?: Holiday){
    setModalOpen(false); 
    if (holiday){
      const thisHoliday = EditCalendarState.calendar.holidays.filter(x => x === props.holiday);
      if (thisHoliday && thisHoliday.length){
        thisHoliday[0].name = holiday.name;
        thisHoliday[0].date = holiday.date;
      }   
    }
    else{
      EditCalendarState.calendar.holidays = EditCalendarState.calendar.holidays.filter(x => x !== props.holiday);
    }    
  }
  return (
    <div className="holiday-entry">
      <div>
        <div>{props.holiday.name}</div>
        <div>
          <FontAwesomeIcon icon={faEdit} onClick={() => setModalOpen(true)} />
        </div>
      </div>
      <div>{getDateString(props.holiday.date, EditCalendarState.calendar)}</div>
      <Modal
        className="modal-wrapper"
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}>
        <div className="standard-modal-inner sm">
          <HolidayEditDialog holiday={props.holiday} onSave={updateHoliday} />
        </div>
      </Modal>
    </div>
  );
});

export default MyComponent;
