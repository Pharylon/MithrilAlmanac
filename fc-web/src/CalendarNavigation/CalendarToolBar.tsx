import React, { CSSProperties } from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import CalendarState from "../State/CalendarState";
import { Link } from "react-router-dom";
import "./CalendarToolBar.css";
import ShareDialog from "./ShareDialog";

const CalendarToolbar = observer((props: { year: number }) => {
  function updateViewType(newValue: string) {
    if (newValue === "Calendar") {
      CalendarState.viewType = "Calendar";
    }
    else {
      CalendarState.viewType = "Timeline";
    }
  }
  const myDisplay: CSSProperties = { display: CalendarState.viewType === "Calendar" ? "" : "none" };
  return (
    <div className="year-header">
      <div className="calendar-bar-left">
        <div className="calendar-select">
          <select
            value={CalendarState.viewType}
            className="view-picker"
            onChange={(e) => updateViewType(e.target.value)}>
            <option value="Calendar">Calendar View</option>
            <option value="Timeline">Timeline View</option>
          </select>
        </div>
        <div className="share-div share-left">
          <ShareDialog id="share-link-2" />
        </div>
      </div>
      <div className="calendar-bar-main">
        <Link style={myDisplay} to={`/calendar/${CalendarState.calendar.id}/${props.year - 1}`}>
          <div><FontAwesomeIcon className="calendar-toolbar-color" icon={faAngleLeft} /></div>
        </Link>
        {
          CalendarState.canEditCalendar ? (
            <Link className="calendar-year-link" to={`/calendar/${CalendarState.calendar.id}/edit`}>
              <div>
                {CalendarState.calendar.name}
              </div>
            </Link>
          ) :
            <div className="calendar-year-link">
              {CalendarState.calendar.name}
            </div>
        }


        <div style={myDisplay} className="calendar-year-current-number">{props.year}</div>
        <Link style={myDisplay} to={`/calendar/${CalendarState.calendar.id}/${props.year + 1}`}>
          <div><FontAwesomeIcon className="calendar-toolbar-color" icon={faAngleRight} /></div>
        </Link>
      </div>
      <div className="calendar-bar-right">
        <ShareDialog id="share-link-1" />
      </div>
    </div>
  );
});

export default CalendarToolbar;
