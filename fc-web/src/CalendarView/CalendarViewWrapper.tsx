import React from "react";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import { Redirect, useParams } from "react-router-dom";
import CalendarView from "./CalendarView";
import { ViewType } from "../Models/CalendarViewType";
import LoadingSpinner from "../LoadingSpinner";


const CalendarViewWrapper = observer((props: {viewType: ViewType}) => {
  if (CalendarState.calendarLoadState === "Error") {
    console.log("Redirecting due to error");
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
      <CalendarView viewType={props.viewType}/>
    ) :
    (
      <div className="calendar">
        <LoadingSpinner />
      </div>
    )
  );
});

export default CalendarViewWrapper;
