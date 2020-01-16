import React from "react";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import "./timeline.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import FantasyDate from "../Models/FantasyDate";
import CalendarEvent from "../Models/CalendarEvent";
import { format } from "date-fns";

const TimeLineEvent = observer((props: { event: CalendarEvent }) => {
  function getDateString(date: FantasyDate) {
    const dayNum = getDayString(date.dayOfMonth);
    const month = CalendarState.calendar.months.find(x => x.position === date.month);
    if (month) {
      return `${dayNum} of ${month.name}, ${date.year}`;
    }
    return "Date Unknown";
  }
  function getRealDate(): string {
    try {
      if (props.event.realDate) {
        return format(props.event.realDate, "MMM do yyyy");
      }
      return "";
    }
    catch (e) {
      console.log("Real Date error", e);
      return "";
    }
  }

  return (
    <div className="timeline-event">
      <div className="timeline-event-header">
        <div className="timeline-event-name-edit">
          <h4>{props.event.name}</h4>
          <div onClick={() => CalendarState.calendarEditEvent = props.event}>
            {
              CalendarState.canEditCalendar && (
                <FontAwesomeIcon icon={faEdit} />
              )
            }
          </div>
        </div>
        <div className="timeline-date">{getDateString(props.event.fantasyDate)}</div>
        <div className="timeline-date">{getRealDate()}</div>
      </div>

      <div className="timeline-view-event-name">
        <div>{props.event.description}</div>
      </div>
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

export default TimeLineEvent;
