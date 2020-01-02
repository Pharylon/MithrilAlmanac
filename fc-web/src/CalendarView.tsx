import React from "react";
import MonthView from "./MonthView";
import { observer } from "mobx-react";
import CalendarState from "./State/CalendarState";
import Modal from "react-modal";
import DayDetailView from "./DayDetail/DayDetailView";
import { useParams, Redirect } from "react-router-dom";
import { CheckIfLeapYear } from "./Models/CalendarModel";
import CalendarToolbar from "./CalendarNavigation/CalendarToolBar";
import TimeLineView from "./TimelineView/TimelineView";
import JoinCalendarHelper from "./CalenderJoinHelper";
import EditEvent from "./DayDetail/EditEvent";


const CalendarView = observer(() => {
  const { year } = useParams();
  function getYear(): number {
    if (!year) {
      return CalendarState.calendar.currentYear;
    }
    return parseInt(year, 10);
  }
  const { calendarId } = useParams();
  if (calendarId) {
    CalendarState.setCalendar(calendarId);
  }
  function onModalClose() {
    CalendarState.selectedDay = undefined;
    CalendarState.calendarEditEvent = undefined;
  }
  if (CalendarState.calendarLoadState === "Loading") {
    return (<div>Loading...</div>);
  }
  if (CalendarState.calendarLoadState === "Error") {
    return <Redirect to={"/"} />;
  }
  const currentYear = getYear();
  const prevYears = currentYear > 0 ? Array.from(Array(currentYear).keys()) : [0];
  const totalDaysInYear = CalendarState.calendar.months.reduce((total, currMonth) => {
    return total + currMonth.days;
  }, 0);
  const daysBeforeYear = prevYears.reduce((totalDays, yearNum) => {
    const isLeapYear = CheckIfLeapYear(yearNum, CalendarState.calendar);
    return totalDays + totalDaysInYear + (isLeapYear ? 1 : 0);
  }, 0);
  const offSetDays = daysBeforeYear % CalendarState.calendar.daysOfWeek.length;
  JoinCalendarHelper(CalendarState.calendar.id);
  return (
    <div className="calendar" id="calendar">
      <CalendarToolbar year={currentYear} />
      {
        CalendarState.viewType === "Calendar" ?
          (<div className="calendar-months">
            {
              CalendarState.calendar.months.map((x) =>
                <MonthView year={currentYear} key={x.position} offsetDays={offSetDays} monthNumber={x.position} />,
              )
            }
          </div>) :
          (<TimeLineView />)
      }
      <Modal
        className="event-modal"
        isOpen={!!CalendarState.selectedDay || !!CalendarState.calendarEditEvent}
        onRequestClose={() => onModalClose()}>
        <div>
          {
            CalendarState.selectedDay && !CalendarState.calendarEditEvent &&
              (
                <DayDetailView date={CalendarState.selectedDay} />
              )
          }
          {
            CalendarState.calendarEditEvent && (
              <EditEvent />
            )
          }
        </div>
      </Modal>
    </div>
  );
});

export default CalendarView;
