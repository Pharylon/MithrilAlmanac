import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import { clone } from "../Utility";
import { CalendarModel } from "../Models/CalendarModel";
import { useParams } from "react-router-dom";
import MonthList from "./MonthList";
import Month from "../Models/Month";
import "./CalendarEditViewStyle.css";
import CalendarNumDays from "./CalendarNumDaysTooltip";

const CalendarEditView: React.FC = observer(() => {
  const { calendarId } = useParams();
  if (calendarId) {
    CalendarState.setCalendar(calendarId);
  }
  const clonedCalendar = clone(CalendarState.calendar);
  const [clonedState, setState] = useState(clonedCalendar);
  useEffect(() => {
    setState(clone(CalendarState.calendar));
  }, [clonedCalendar.id]);
  function setCalendarName(newValue: string) {
    const newCalendarValue: CalendarModel = {
      ...clonedState,
      name: newValue,
    };
    setState(newCalendarValue);
  }
  function setCurrentYear(newValue: string) {
    const currentYear = parseInt(newValue, 10);
    if (currentYear) {
      setState({
        ...clonedCalendar,
        currentYear,
      });
    }
  }
  function setMonths(newMonths: Month[]) {
    console.log("newMonths", newMonths);
    const newCalendarValue: CalendarModel = {
      ...clonedState,
      months: newMonths,
    };
    setState(newCalendarValue);
  }
  const totalDaysInYear = clonedCalendar.months.reduce((total, currMonth) => {
    return total + currMonth.days;
  }, 0);
  return (
    <div className="calendar-edit-view">
      <div>
        <label htmlFor="calendar-name" style={{ display: "none" }}>Calendar Name</label>
        <div>
          <input id="calendar-edit-name-input" className="input-standard"
            value={clonedState.name}
            onChange={(e) => setCalendarName(e.target.value)} />
        </div>
      </div>
      <div className="calendar-edit-input-combo">
        <label htmlFor="calendar-name">Current Year</label>
        <input className="input-standard"
          type="number"
          min="0"
          step="1"
          value={clonedState.currentYear}
          onChange={(e) => setCurrentYear(e.target.value)} />
      </div>
      <div>
        <CalendarNumDays totalDaysInYear={totalDaysInYear} />
      </div>
      <MonthList months={clonedState.months} updateMonths={setMonths} />
    </div>
  );
});

export default CalendarEditView;
