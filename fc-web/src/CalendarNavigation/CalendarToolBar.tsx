import React, { CSSProperties, useState } from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import CalendarState from "../State/CalendarState";
import { Link, Redirect } from "react-router-dom";
import "./CalendarToolBar.css";
import ShareDialog from "./ShareDialog";
import { ViewType } from "../Models/CalendarViewType";

const CalendarToolbar = observer((props: { year: number, viewType: ViewType }) => {
  const [viewType, setViewType] = useState(props.viewType);
  if (viewType !== props.viewType){
    if (viewType === ViewType.Calendar){
      return <Redirect to={`/calendar/${CalendarState.calendar.id}` }/>;
    }
    if (viewType === ViewType.Timeline){
      return <Redirect to={`/timeline/${CalendarState.calendar.id}` }/>;
    }
    if (viewType === ViewType.Condensed){
      return <Redirect to={`/condensed/${CalendarState.calendar.id}` }/>;
    }
  }
  function updateViewType(newValue: string) {
    const newViewType = newValue as ViewType;
    setViewType(newViewType);
  }
  const myDisplay: CSSProperties = { display: props.viewType === ViewType.Calendar ? "" : "none" };
  return (
    <div className={"year-header" + (CalendarState.calendarEditEvent ? " hide-portrait" : "")}>
      <div className="calendar-bar-left">
        <div className="calendar-select">
          <select
            value={props.viewType}
            className="view-picker"
            onChange={(e) => updateViewType(e.target.value)}>
            <option value={ViewType.Calendar}>Calendar View</option>
            <option value={ViewType.Timeline}>Timeline View</option>
            <option value={ViewType.Condensed}>Condensed View</option>
          </select>
        </div>
        <div className="share-div share-left">
          <ShareDialog id="share-link-2" />
        </div>
      </div>
      <div className="calendar-bar-main">
        <Link 
          style={myDisplay} to={`/calendar/${CalendarState.calendar.id}/${props.year - 1}`}>
          <div><FontAwesomeIcon className="calendar-toolbar-color ct-angle-icon" icon={faAngleLeft} /></div>
        </Link>
        {
          CalendarState.canEditCalendar ? (
            <div className="calendar-year-link ct-small-portrait calendar-toolbar-color">
              <Link to={`/edit/${CalendarState.calendar.id}`}>
                {CalendarState.calendar.name}
              </Link>
            </div>
          ) :
            <div className="calendar-year-link ct-small-portrait calendar-toolbar-color">
              {CalendarState.calendar.name}
            </div>
        }


        <div style={myDisplay} className="calendar-year-current-number ct-small-portrait">
          <div>{props.year}</div>
        </div>
        <Link style={myDisplay} to={`/calendar/${CalendarState.calendar.id}/${props.year + 1}`}>
          <div><FontAwesomeIcon className="calendar-toolbar-color ct-angle-icon" icon={faAngleRight} /></div>
        </Link>
      </div>
      <div className="calendar-bar-right">
        <ShareDialog id="share-link-1" />
      </div>
    </div>
  );
});

export default CalendarToolbar;
