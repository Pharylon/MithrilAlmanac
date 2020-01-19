import React from "react";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import { useParams, Redirect } from "react-router-dom";
import CalendarViewWrapper from "./CalendarViewWrapper";
import { ViewType } from "../State/CalendarViewType";

const DefaultView: React.FC = observer(() => {
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
      <CalendarViewWrapper viewType={CalendarState.calendar.defaultView || ViewType.Calendar}/>
    ) :
    (
      <div>Hang on while we load your calendar...</div>
    )
  );
});

export default DefaultView;
