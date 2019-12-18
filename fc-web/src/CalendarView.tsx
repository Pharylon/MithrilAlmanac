import React from "react";
import MonthView from "./MonthView";
import { observer } from "mobx-react";
import CalendarState from "./State/CalendarState";
import Modal from "react-modal";
import DayDetailView from "./DayDetail/DayDetailView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";


const CalendarView = observer(() => {
  const myApp = document.getElementById("calendar");
  if (myApp) {
    Modal.setAppElement(myApp);
  }
  function onModalClose(){
    CalendarState.selectedDay = undefined;
    CalendarState.calendarEventEditId = "";
  }
  return (
    <div className="calendar" id="calendar">
      <div className="year-header">
        <FontAwesomeIcon icon={faAngleLeft} onClick={() => CalendarState.decrementYear()} />
        <span className="year-number">{CalendarState.currentYear}</span>
        <FontAwesomeIcon icon={faAngleRight} onClick={() => CalendarState.incrementYear()}/>
      </div>
      <div className="calendar-months">
        {
          CalendarState.calendar.months.map(x =>
            <MonthView key={x.position} monthNumber={x.position} />,
          )
        }
      </div>
      {
        CalendarState.selectedDay && (
          <Modal
            className="event-modal"
            isOpen={!!CalendarState.selectedDay}
            onRequestClose={() => onModalClose()}>
            <DayDetailView date={CalendarState.selectedDay} />
          </Modal>
        )
      }

    </div>
  );
});

export default CalendarView;