import React, { useState } from "react";
import { observer } from "mobx-react";
import UserState from "../State/UserState";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import NewCalendar from "../NewCalendar/NewCalendar";
import CalendarState from "../State/CalendarState";


const CalendarDd: React.FC = observer(() => {
  const [isOpen, setIsOpen] = useState(false);
  function closeCall(){
    CalendarState.createCalendarIsOpen = false;
    setIsOpen(false);
  }
  return (
    <div onMouseLeave={() => setIsOpen(false)}>
      <div style={{ fontWeight: isOpen && !CalendarState.createCalendarIsOpen ? "bold" : "normal" }}
        className="hover-bold hover-underline"
        onClick={() => setIsOpen(true)}>Calendars</div>
      <div style={{ display: isOpen && !CalendarState.createCalendarIsOpen ? "" : "none" }} className="calendar-dd">
        {
          UserState.calendars.map(x => (
            <div key={x.id}>
              <Link onClick={() => setIsOpen(false)} className="hover-bold" to={"/calendar/" + x.id}>{x.name}</Link>
            </div>))
        }
        <div className="hover-bold" onClick={() => CalendarState.createCalendarIsOpen = true}>Create New</div>
        <Modal
          className="event-modal"
          isOpen={CalendarState.createCalendarIsOpen}
          onRequestClose={() => closeCall()}
        >
          <NewCalendar close={() => closeCall()}  />
        </Modal>
      </div>
    </div>
  );
});

export default CalendarDd;
