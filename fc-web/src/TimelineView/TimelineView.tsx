import React from "react";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import "./timeline.css";
import TimeLineEvent from "./TimeLineEvent";

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
    CalendarState.addNewEvent(CalendarState.calendar.currentDate);
  }
  return (
    <div className="timeline-events">
      {
        events.map(x => (<TimeLineEvent event={x} key={x.id} />))
      }
      {
        CalendarState.canEditCalendar && (
          <div className="add-event-timeline">
            <button onClick={addNewEvent} className="blue-button bg">Add New Event</button>
          </div>
        )
      }
    </div>
  );
});


export default TimeLineView;
