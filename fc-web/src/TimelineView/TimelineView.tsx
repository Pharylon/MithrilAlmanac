import React from "react";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import "./timeline.css";
import TimeLineEvent from "./TimeLineEvent";
import { GetDaysBetweenDates } from "../Models/CalendarModel";
import ErrorState from "../State/ErrorState";
import UserState from "../State/UserState";

const TimeLineView: React.FC = observer(() => {
  const events = [...CalendarState.events];
  events.sort((a, b) => {
    if (a.fantasyDate.year !== b.fantasyDate.year) {
      return a.fantasyDate.year - b.fantasyDate.year;
    }
    else if (a.fantasyDate.month !== b.fantasyDate.month) {
      return a.fantasyDate.month - b.fantasyDate.month;
    }
    else {
      return a.fantasyDate.dayOfMonth - b.fantasyDate.dayOfMonth;
    }
  });
  function addNewEvent() {
    if (!UserState.userModel){
      UserState.loginModalOpen = true;
    }
    else if (!CalendarState.canEditCalendar){
      ErrorState.errorMessage = "You do not have permission to edit this calendar. " + 
        "Ask someone to send you a \"Share\" link.";
    }
    else{
      CalendarState.addNewEvent(CalendarState.calendar.currentDate);
    }
  }
  const maxSpacing = 200;
  function getTimeLineEventSpacing(daysBetween: number) {
    const spacing = daysBetween * 5;
    if (spacing > maxSpacing) {
      return maxSpacing;
    }
    return spacing;
  }
  return (
    <div className="timeline-events">
      {
        events.map((x, i) => {
          let daysBetween = 0;
          if (i < events.length - 1) {
            const nextEvent = events[i + 1];
            daysBetween = GetDaysBetweenDates(CalendarState.calendar, x.fantasyDate, nextEvent.fantasyDate);
          }
          const spacing = getTimeLineEventSpacing(daysBetween);
          return (
            <div key={x.id} className="timeline-event-wrapper">
              <TimeLineEvent event={x} />
              <div
                style={{ height: spacing }}
                className={`timeline-connector ${spacing === maxSpacing ? "dashed" : "solid"}`}>
                <div></div>
                <div></div>
              </div>
            </div>
          );
        })
      }
      {
        !events.length && (
          <div
            style={{ marginTop: 100, fontWeight: "bold" }}
            className="timeline-event">You haven't added any events yet!</div>)
      }
      <div className="add-event-timeline">
        <button onClick={addNewEvent} className="blue-button bg">Add New Event</button>
      </div>
    </div>
  );
});


export default TimeLineView;
