import React from "react";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import { useParams, Redirect } from "react-router-dom";
import CalendarViewWrapper from "./CalendarViewWrapper";
import { ViewType } from "../Models/CalendarViewType";
import LoadingSpinner from "../LoadingSpinner";

const DefaultView: React.FC = observer(() => {
  if (CalendarState.calendarLoadState === "Error") {
    console.log("Redirecting due to error and clearing last calendar");
    localStorage.removeItem("LastCalendar");
    return <Redirect to={"/"} />;
  }
  if (CalendarState.calendarLoadState === "Loading") {
    return (<div className="calendar"><LoadingSpinner /></div>);
  }
  const { calendarId } = useParams<{calendarId: string}>();
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
