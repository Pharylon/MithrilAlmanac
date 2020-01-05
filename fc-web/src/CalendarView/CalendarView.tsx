import React from "react";
import MonthView from "./MonthView";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import Modal from "react-modal";
import DayDetailView from "../DayDetail/DayDetailView";
import { useParams } from "react-router-dom";
import CalendarToolbar from "../CalendarNavigation/CalendarToolBar";
import TimeLineView from "../TimelineView/TimelineView";
import JoinCalendarHelper from "../CalenderJoinHelper";
import EditEvent from "../DayDetail/EditEvent";
import "./CalendarView.css";


const CalendarView = observer(() => {
  const { year } = useParams();
  function getYear(): number {
    if (!year) {
      return CalendarState.calendar.currentYear;
    }
    return parseInt(year, 10);
  }
  function onModalClose() {
    CalendarState.selectedDay = undefined;
    CalendarState.calendarEditEvent = undefined;
  }
  const currentYear = getYear();
  JoinCalendarHelper(CalendarState.calendar.id);
  return (
    <div className="calendar" id="calendar">
      <CalendarToolbar year={currentYear} />
      {
        CalendarState.viewType === "Calendar" ?
          (<div className="calendar-months">
            {
              CalendarState.calendar.months.map((x) =>
                <MonthView 
                  year={currentYear} 
                  key={x.position} 
                  monthNumber={x.position} />,
              )
            }
          </div>) :
          (<TimeLineView />)
      }
      <Modal
        className="modal-wrapper"
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
