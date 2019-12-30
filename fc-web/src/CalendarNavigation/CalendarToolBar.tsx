import React, { useState } from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import CalendarState from "../State/CalendarState";
import { Link, Route } from "react-router-dom";
import "./CalendarToolBar.css";

const CalendarToolbar = observer((props: { year: number }) => {
  function updateViewType(newValue: string) {
    if (newValue === "Calendar") {
      CalendarState.viewType = "Calendar";
    }
    else {
      CalendarState.viewType = "Timeline";
    }
  }
  return (
    <div className="year-header">
      <div className="calendar-bar-left">
        <select
          value={CalendarState.viewType}
          className="view-picker"
          onChange={(e) => updateViewType(e.target.value)}>
          <option value="Calendar">Calendar View</option>
          <option value="Timeline">Timeline View</option>
        </select>
      </div>
      <div className="calendar-bar-main">
        <Link to={`/calendar/${CalendarState.calendar.id}/${props.year - 1}`}>
          <div><FontAwesomeIcon className="calendar-toolbar-color" icon={faAngleLeft} /></div>
        </Link>
        <Link className="calendar-year-link" to={`/calendar/${CalendarState.calendar.id}/edit`}>
          <div>
            {CalendarState.calendar.name}
          </div>
        </Link>

        <div className="calendar-year-current-number">{props.year}</div>
        <Link to={`/calendar/${CalendarState.calendar.id}/${props.year + 1}`}>
          <div><FontAwesomeIcon className="calendar-toolbar-color" icon={faAngleRight} /></div>
        </Link>
      </div>
      <div className="calendar-bar-right">&nbsp;</div>
    </div>
  );
});

export default CalendarToolbar;
