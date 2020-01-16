import React, { useState } from "react";
import { observer } from "mobx-react";
import EditCalendarState from "../State/EditCalendarState";
import { useParams, Redirect } from "react-router-dom";
import MonthList from "./MonthList";
import "./CalendarEditViewStyle.css";
import CalendarNumDays from "./CalendarNumDaysTooltip";
import { SaveCalendar } from "../DataClients/CalendarEventDataClient";
import DangerZone from "./DangerZone";
import CalendarState from "../State/CalendarState";
import HolidayView from "./HolidayEdit";
import MoonEdit from "./Moons/MoonEdit";
import CalendarEditDaysOfWeek from "./Days/CalendarEditDays";
import LeapYearEdit from "./LeapYearEdit";
import EditMisc from "./CalendarEditMisc";
import FantasyDate from "../Models/FantasyDate";
import FantasyDateSelector from "../DayDetail/FantasyDateSelector";

const CalendarEditView: React.FC = observer(() => {
  const { calendarId } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [showDanger, setShowDanger] = useState(false);
  if (redirect) {
    return (<Redirect to={`/calendar/${calendarId}`} />);
  }
  if (calendarId) {
    EditCalendarState.setCalendar(calendarId);
  }
  function setCalendarName(newValue: string) {
    EditCalendarState.calendar.name = newValue;
  }
  function setCurrentDate(newValue: FantasyDate) {
    if (newValue) {
      EditCalendarState.calendar.currentDate = newValue;
    }
  }
  async function save() {
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
        <label htmlFor="calendar-name">Current Date</label>
        <FantasyDateSelector
          date={EditCalendarState.calendar.currentDate}
          calendarModel={EditCalendarState.calendar}
          updateDate={setCurrentDate} />
      </div>
      <div>
        <CalendarNumDays totalDaysInYear={totalDaysInYear} />
      </div>
      <div className="edit-calendar-main">
        <div className="edit-calendar-col">
          <MonthList />
        </div>
        <div className="edit-calendar-col">
          <MoonEdit />
          <CalendarEditDaysOfWeek />
          <EditMisc />
        </div>
        <div className="edit-calendar-col">
          <LeapYearEdit />
          <HolidayView />
        </div>
        <div className="edit-calendar-col calendar-save-col">
          <div>
            <div>
              <button className="save-button" onClick={() => save()}>Save Changes</button>
            </div>
            <div>
              <input type="checkbox" checked={showDanger} onChange={(e) => setShowDanger(!showDanger)} />
              <span>Show Danger Zone</span>
            </div>
            {
              showDanger && (
                <DangerZone />
              )
            }
          </div>
        </div>
      </div>
      <div className="calendar-save-bottom">
          <div>
            <div>
              <button className="save-button" onClick={() => save()}>Save Changes</button>
            </div>
            <div>
              <input type="checkbox" checked={showDanger} onChange={(e) => setShowDanger(!showDanger)} />
              <span>Show Danger Zone</span>
            </div>
            {
              showDanger && (
                <DangerZone />
              )
            }
          </div>
        </div>
    </div>
  );
});

export default CalendarEditView;
