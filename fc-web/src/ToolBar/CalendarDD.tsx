import React, { useState } from "react";
import { observer } from "mobx-react";
import UserState from "../State/UserState";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import NewCalendar from "../NewCalendar/NewCalendar";
import CalendarState from "../State/CalendarState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";


const CalendarDd: React.FC = observer(() => {
  const [isOpen, setIsOpen] = useState(false);
  function closeCall(){
    CalendarState.createCalendarIsOpen = false;
    setIsOpen(false);
  }
  let mouseLeaveTimeout: number | undefined;
  function onMouseLeave(){
    mouseLeaveTimeout = window.setTimeout(() => {
      setIsOpen(false);
    }, 500);
  }
  function onMouseEnter(){
    if (mouseLeaveTimeout){
      window.clearTimeout(mouseLeaveTimeout);
    }
  }
  return (
    <div 
      onMouseLeave={() => onMouseLeave()} onMouseEnter={() => onMouseEnter()}
      className="calendar-dd-wrap tool-child">
      <div style={{ fontWeight: isOpen && !CalendarState.createCalendarIsOpen ? "bold" : "normal" }}
        onClick={() => setIsOpen(true)}>Calendars</div>
      <div style={{ display: isOpen && !CalendarState.createCalendarIsOpen ? "" : "none" }} className="calendar-dd">
        {
          UserState.calendars.map(x => (
            <div key={x.id} className="calendar-dd-item">
              <div>
                <Link className="toolbar-link"  onClick={() => setIsOpen(false)} to={"/calendar/" + x.id}>
                  <span className="calendar-dd-name hover-underline">{x.name}</span>
                </Link>
              </div>
              <div className="calendar-edit-dd">
                <div>
                  <Link 
                    onClick={() => setIsOpen(false)} 
                    className="hover-underline toolbar-link"  
                    to={`/edit/${x.id}`}>
                      <FontAwesomeIcon icon={faEdit}/>
                    </Link>
                </div>
              </div>
            </div>))
        }
        <div 
          className="hover-underline calendar-dd-item" 
          onClick={() => CalendarState.createCalendarIsOpen = true}>Create New</div>
        <Modal
          className="modal-wrapper"
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
