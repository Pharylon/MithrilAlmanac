import React from "react";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import { Redirect, useParams } from "react-router-dom";
import CalendarView from "./CalendarView";
import { ViewType } from "./CalendarViewType";


const CalendarViewWrapper = observer((props: {viewType: ViewType}) => {
  if (CalendarState.calendarLoadState === "Error") {
    console.log("Redirecting due to error");
    return <Redirect to={"/"} />;
  }
  if (CalendarState.calendarLoadState === "Loading") {
    return (<div>Loading...</div>);
  }
  const { calendarId } = useParams();
  if (calendarId) {
    CalendarState.loadCalendar(calendarId);
  }
  return (
    CalendarState.calendarLoadState === "Loaded" ? (
      <CalendarView viewType={props.viewType}/>
    ) :
    (
      <div>No Calendar Found...</div>
    )
  );
});

export default CalendarViewWrapper;
