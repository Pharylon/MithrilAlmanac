import React from "react";
import { observer } from "mobx-react";
import "./DayDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import CalendarEvent from "../Models/CalendarEvent";
import CalendarState from "../State/CalendarState";
import { format } from "date-fns";

const EventDetail = observer((props: { event: CalendarEvent }) => {
  function startEdit() {
    CalendarState.calendarEditEvent = props.event;
  }
  let realDate = "Error";
  try {
    realDate = props.event.realDate ? format(props.event.realDate, "MMM do yyyy") : "Unknown Real Date";
  }
  catch (e) {
    console.log("Real Date error", e, realDate);
  }

  return (
    <div className="event-detail-container">
      <div className="event-detail-top">
        <h3 className="event-detail-title">
          {props.event.name}&nbsp;
          {
            CalendarState.canEditCalendar && (
              <FontAwesomeIcon className="event-edit-icon" icon={faEdit} onClick={() => startEdit()} />
            )
          }
        </h3>
        <div className="event-real-date">{realDate}</div>
      </div>
      <div className="event-description">
        {
          props.event.description.split("\n").map((x, i) => (<div style={{ marginBottom: 5 }} key={i}>{x}</div>))
        }
      </div>
    </div>
  );
});

export default EventDetail;

