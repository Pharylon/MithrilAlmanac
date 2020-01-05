import React, { useState } from "react";
import { observer } from "mobx-react";
import EditCalendarState from "../State/EditCalendarState";
import { Holiday } from "../Models/FantasyDate";
import Modal from "react-modal";
import HolidayEditDialog from "./HolidayEditDialog";
import HolidayLine from "./HolidayLine";

const HolidayView: React.FC = observer(() => {
  const [modalOpen, setModalOpen] = useState(false);
  function addHoliday(newHoliday?: Holiday) {
    if (newHoliday) {
      if (!EditCalendarState.calendar.holidays) {
        EditCalendarState.calendar.holidays = [];
      }
      EditCalendarState.calendar.holidays.push(newHoliday);
      setModalOpen(false);
    }
  }
  const holidays = [...EditCalendarState.calendar.holidays];
  holidays.sort((a, b) => {
    if (a.date.month !== b.date.month) {
      return a.date.month - b.date.month;
    }
    else {
      return a.date.dayOfMonth - b.date.dayOfMonth;
    }
  });
  return (
    <div>
      <h3 className="edit-title">Holidays</h3>
      <div className="gray-box">
        {
          holidays ?
            holidays.map((x, i) => (
              <HolidayLine holiday={x} key={i} />
            )) :
            (<div>No Holidays Entered</div>)
        }
        <div>
          <button className="blue-button" onClick={() => setModalOpen(true)}>Add Holiday</button>
        </div>
        <Modal
          className="modal-wrapper"
          isOpen={modalOpen}
          onRequestClose={() => setModalOpen(false)}>
          <div className="standard-modal-inner sm">
            <HolidayEditDialog onSave={addHoliday} />
          </div>
        </Modal>
      </div>
    </div>
  );
});

export default HolidayView;
