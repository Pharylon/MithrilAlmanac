import React, { useState } from "react";
import { observer } from "mobx-react";
import CalendarEditState from "../State/CalendarEditState";
import { useParams, Redirect } from "react-router-dom";
import MonthList from "./MonthList";
import "./CalendarEditViewStyle.css";
import CalendarNumDays from "./CalendarNumDaysTooltip";
import {SaveCalendar} from "../DataClients/CalendarEventDataClient";
import CalendarState from "../State/CalendarState";

const CalendarEditView: React.FC = observer(() => {
  const { calendarId } = useParams();
  const [redirect, setRedirect] = useState(false);
  console.log("Redirect", redirect);
  if (redirect){
    return (<Redirect to={`/calendar/${calendarId}`} />);
  }
  if (calendarId) {
    CalendarEditState.setCalendar(calendarId);
  }
  if (CalendarEditState.calendarLoadState === "Loading") {
    return (<div>Loading...</div>);
  }
  function setCalendarName(newValue: string) {
    CalendarEditState.calendar.name = newValue;
  }
  function setCurrentYear(newValue: string) {
    const currentYear = parseInt(newValue, 10);
    if (currentYear) {
      CalendarEditState.calendar.currentYear = currentYear;
    }
  }
  async function save(){
    await SaveCalendar(CalendarEditState.calendar);
    setRedirect(true);
    CalendarState.reset();
  }
  const totalDaysInYear = CalendarEditState.calendar.months.reduce((total, currMonth) => {
    return total + currMonth.days;
  }, 0);
  return (
    <div className="calendar-edit-view">
      <div>
        <label htmlFor="calendar-name" style={{ display: "none" }}>Calendar Name</label>
        <div>
          <input id="calendar-edit-name-input" className="input-standard"
            value={CalendarEditState.calendar.name}
            onChange={(e) => setCalendarName(e.target.value)} />
        </div>
      </div>
      <div className="calendar-edit-input-combo">
        <label htmlFor="calendar-name">Current Year</label>
        <input className="input-standard"
          type="number"
          min="0"
          step="1"
          value={CalendarEditState.calendar.currentYear}
          onChange={(e) => setCurrentYear(e.target.value)} />
      </div>
      <div>
        <CalendarNumDays totalDaysInYear={totalDaysInYear} />
      </div>
      <MonthList />
      <div>
        <button className="save-button" onClick={() => save()}>Save</button>
      </div>
    </div>
  );
});

export default CalendarEditView;
