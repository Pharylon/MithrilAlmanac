import React from "react";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import "./timeline.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faEdit } from "@fortawesome/free-solid-svg-icons";
import FantasyDate from "../Models/FantasyDate";

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
  function getDateString(date: FantasyDate) {
    const dayNum = getDayString(date.dayOfMonth);
    const month = CalendarState.calendar.months.find(x => x.position === date.month);
    if (month) {
      return `${dayNum} of ${month.name}, ${date.year}`;
    }
    return "Date Unknown";
  }
  function addNewEvent() {
    const newEventDate: FantasyDate = {
      year: 0,
      dayOfMonth: 0,
      month: 1,
    };
    CalendarState.addNewEvent(newEventDate);
  }
  return (
    <div className="timeline-events">
      {
        events.map(x => (
          <div key={x.id} className="timeline-event">
            <FontAwesomeIcon className="event-icon" icon={faInfoCircle} />
            <div className="event-description">
              <div className="timeline-view-event-name">
                <div>{x.name}</div>
                <div onClick={() => CalendarState.calendarEditEvent = x}>
                  {
                    CalendarState.canEditCalendar && (
                      <FontAwesomeIcon icon={faEdit} />
                    )
                  }
                </div>
              </div>
              <div className="timeline-date">{getDateString(x.fantasyDate)}</div>
            </div>
          </div>
        ))
      }
      {
        CalendarState.canEditCalendar && (
          <div>
            <button onClick={addNewEvent} className="blue-button">Add New Date</button>
          </div>
        )
      }
    </div>
  );
});

function getDayString(dayNum: number) {
  if (dayNum === 1) {
    return "1st";
  }
  else if (dayNum === 2) {
    return "2nd";
  }
  else if (dayNum === 3) {
    return "3rd";
  }
  else {
    return dayNum + "th";
  }
}

export default TimeLineView;
