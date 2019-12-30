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
  const realDate = props.event.realDate ? format(props.event.realDate, "MMM do yyyy") : "Unknown Real Date";
  return (
    <div className="event-detail-container">
      <h3 className="event-detail-title">
        {props.event.name}&nbsp;
        <FontAwesomeIcon className="event-edit-icon" icon={faEdit} onClick={() => startEdit()} />
      </h3>
      <div className="event-real-date">{realDate}</div>
      <div className="event-description">
        {
          props.event.description.split("\n").map((x, i) => (<div style={{ marginBottom: 5 }} key={i}>{x}</div>))
        }
      </div>
    </div>
  );
});

export default EventDetail;

