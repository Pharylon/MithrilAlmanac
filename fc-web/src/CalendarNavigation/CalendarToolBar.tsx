import React from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import CalendarState from "../State/CalendarState";
import { Link } from "react-router-dom";
import "./CalendarToolBar.css";

const CalendarToolbar: React.FC = observer(() => {
  return (
    <div className="year-header">
      <div><FontAwesomeIcon icon={faAngleLeft} onClick={() => CalendarState.decrementYear()} /></div>
        <Link className="calendar-year-link" to={`/calendar/${CalendarState.calendar.id}/edit`}>
        <div>
          {CalendarState.calendar.name}
        </div>
        </Link>
      
      <div className="calendar-year-current-number">{CalendarState.yearView}</div>
      <div><FontAwesomeIcon icon={faAngleRight} onClick={() => CalendarState.incrementYear()} /></div>
    </div>
  );
});

export default CalendarToolbar;
