import React, { useState } from "react";
import { observer } from "mobx-react";
import CalendarState from "../../State/CalendarState";
import "./timeline.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import FantasyDate from "../../Models/FantasyDate";
import CalendarEvent from "../../Models/CalendarEvent";
import { format } from "date-fns";

const TimeLineEvent = observer((props: { event: CalendarEvent }) => {
  const [showDesc, setShowDesc] = useState(false);
  function getDateString(date: FantasyDate) {
    const dayNum = getDayString(date.dayOfMonth);
    const month = CalendarState.calendar.months.find(x => x.position === date.month);
    if (month) {
      return `${dayNum} of ${month.name}, ${date.year}`;
    }
    return "Date Unknown";
  }
  function editEvent(e: React.MouseEvent<HTMLDivElement, MouseEvent>){
    e.stopPropagation();
    e.preventDefault();
    CalendarState.calendarEditEvent = props.event;
  }
  return (
    <div className="timeline-event" onClick={() => setShowDesc(!showDesc)}>
      <div className="timeline-event-header">
        <div className="timeline-event-name-edit">
          <h4>{props.event.name}</h4>
          <div onClick={(e) => editEvent(e)}>
            {
              CalendarState.canEditCalendar && (
                <FontAwesomeIcon icon={faEdit} />
              )
            }
          </div>
        </div>
        <div className="timeline-date">
          <div>{getDateString(props.event.fantasyDate)}</div>
          {
            showDesc && (<div>{props.event.realDate ? format(props.event.realDate, "MMM do yyyy") : ""}</div>)
          }
        </div>
      </div>

      {
        showDesc && (
          <div className="timeline-view-event-name">
            <div>{props.event.description}</div>
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

export default TimeLineEvent;
