import React from "react";
import MonthView from "./MonthView";
import { observer } from "mobx-react";
import CalendarState from "./State/CalendarState";
import Modal from "react-modal";
import DayDetailView from "./DayDetail/DayDetailView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";


const CalendarView = observer(() => {
  const {calendarId} = useParams();
  if (calendarId){
    CalendarState.setCalendar(calendarId);
  }
  const myApp = document.getElementById("calendar");
  if (myApp) {
    Modal.setAppElement(myApp);
  }
  function onModalClose(){
    CalendarState.selectedDay = undefined;
    CalendarState.calendarEventEditId = "";
  }
  console.log("Calendar View");
  if (CalendarState.calendar.id === "__BLANK__") {
    return (<div>Could not load Calendar</div>);
  }
  return (
    <div className="calendar" id="calendar">
      <div className="year-header">
        <FontAwesomeIcon icon={faAngleLeft} onClick={() => CalendarState.decrementYear()} />
        <span className="year-number">{CalendarState.yearView}</span>
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
