import React, { useState } from "react";
import { observer } from "mobx-react";
import EditCalendarState from "../State/EditCalendarState";
import { useParams, Redirect } from "react-router-dom";
import MonthList from "./MonthList";
import "./CalendarEditViewStyle.css";
import CalendarNumDays from "./CalendarNumDaysTooltip";
import {SaveCalendar} from "../DataClients/CalendarEventDataClient";
import DangerZone from "./DangerZone";
import CalendarState from "../State/CalendarState";
import HolidayView from "./HolidayEdit";
import MoonEdit from "./MoonEdit";

const CalendarEditView: React.FC = observer(() => {
  const { calendarId } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [showDanger, setShowDanger] = useState(false);
  if (redirect){
    return (<Redirect to={`/calendar/${calendarId}`} />);
  }
  if (calendarId) {
    EditCalendarState.setCalendar(calendarId);
  }
  function setCalendarName(newValue: string) {
    EditCalendarState.calendar.name = newValue;
  }
  function setCurrentYear(newValue: string) {
    const currentYear = parseInt(newValue, 10);
    if (currentYear) {
      EditCalendarState.calendar.currentYear = currentYear;
    }
  }
  async function save(){
    await SaveCalendar(EditCalendarState.calendar);
    setRedirect(true);
    CalendarState.reset();
  }
  const totalDaysInYear = EditCalendarState.calendar.months.reduce((total, currMonth) => {
    return total + currMonth.days;
  }, 0);
  return (
    <div className="calendar-edit-view">
      <div>
        <label htmlFor="calendar-name" style={{ display: "none" }}>Calendar Name</label>
        <div>
          <input id="calendar-edit-name-input" className="input-standard"
            value={EditCalendarState.calendar.name}
            onChange={(e) => setCalendarName(e.target.value)} />
        </div>
      </div>
      <div className="calendar-edit-input-combo">
        <label htmlFor="calendar-name">Current Year</label>
        <input className="input-standard"
          type="number"
          min="0"
          step="1"
          value={EditCalendarState.calendar.currentYear}
          onChange={(e) => setCurrentYear(e.target.value)} />
      </div>
      <div>
        <CalendarNumDays totalDaysInYear={totalDaysInYear} />
      </div>
      <div className="edit-calendar-main">
        <div className="edit-calendar-col">
          <MonthList />
        </div>
        <div className="edit-calendar-col">
          <HolidayView />
          <MoonEdit />
        </div>
      </div>
      <div>
        <button className="save-button" onClick={() => save()}>Save</button>
      </div>
      <div>
        <input type="checkbox" checked={showDanger} onChange={(e) => setShowDanger(!showDanger)} />
        <span>Show Danger Zone</span>
      </div>
      {
        showDanger && (
          <DangerZone/>
        )
      }
    </div>
  );
});

export default CalendarEditView;
