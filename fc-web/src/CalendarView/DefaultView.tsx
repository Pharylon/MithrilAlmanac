import React from "react";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import { useParams } from "react-router-dom";
import CalendarViewWrapper from "./CalendarViewWrapper";
import { ViewType } from "../Models/CalendarViewType";
import LoadingSpinner from "../LoadingSpinner";

const DefaultView: React.FC = observer(() => {
  const { calendarId } = useParams<{calendarId: string}>();
  if (CalendarState.calendarLoadState === "Error") {
    console.log("Redirecting due to error and clearing last calendar");
    localStorage.removeItem("LastCalendar");
    window.location.assign("/home"); //hard bail to the landing page to force reload in case of error
  }
  if (CalendarState.calendarLoadState === "Loading") {
    return (<div className="calendar"><LoadingSpinner /></div>);
  }
  if (calendarId) {
    CalendarState.loadCalendar(calendarId);
  }
  return (
    CalendarState.calendarLoadState === "Loaded" ? (
      <CalendarViewWrapper viewType={CalendarState.calendar.defaultView || ViewType.Calendar}/>
    ) :
    (
      <div className="calendar">
        <LoadingSpinner />
      </div>
    )
  );
});

export default DefaultView;
