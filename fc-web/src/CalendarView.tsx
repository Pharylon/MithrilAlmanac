import React from "react";
import MonthView from "./MonthView";
import { observer } from "mobx-react";
import CalendarState from "./State/CalendarState";
import Modal from "react-modal";
import DayDetailView from "./DayDetail/DayDetailView";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useParams, Redirect } from "react-router-dom";
import { CheckIfLeapYear } from "./Models/CalendarModel";


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
    CalendarState.events = CalendarState.events.filter(x => x.id !== "__NEW_EVENT__");
  }
  if (CalendarState.calendarLoadState === "Loading") {
    return (<div>Loading...</div>);
    //return <Redirect to={"/"} />;
  }
  if (CalendarState.calendarLoadState === "Error") {
    return <Redirect to={"/"} />;
  }
  console.log("CurrentCalendar", CalendarState.calendar);
  const prevYears = CalendarState.yearView > 0 ?  Array.from(Array(CalendarState.yearView).keys()) : [0];
  const totalDaysInYear = CalendarState.calendar.months.reduce((total, currMonth) => {
    return total + currMonth.days;
  }, 0);
  const daysBeforeYear = prevYears.reduce((totalDays, yearNum) => {
    const isLeapYear = CheckIfLeapYear(yearNum, CalendarState.calendar);
    return totalDays + totalDaysInYear + (isLeapYear ? 1 : 0);
  }, 0);
  const offSetDays = daysBeforeYear % CalendarState.calendar.daysOfWeek.length;
  return (
    <div className="calendar" id="calendar">
      <div className="year-header">
        <FontAwesomeIcon icon={faAngleLeft} onClick={() => CalendarState.decrementYear()} />
        <span className="year-number">{CalendarState.yearView}</span>
        <FontAwesomeIcon icon={faAngleRight} onClick={() => CalendarState.incrementYear()}/>
      </div>
      <div className="calendar-months">
        {
          CalendarState.calendar.months.map((x, i) =>
            <MonthView key={x.position} offsetDays={offSetDays} monthNumber={x.position} />,
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
