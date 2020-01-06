import React from "react";
import { observer } from "mobx-react";
import EditCalendarState from "../../State/EditCalendarState";
import CalendarState from "../../State/CalendarState";
import CalendarEditDay from "./CalendarDayItem";
import "./CalendarEditDay.css";

const CalendarEditDaysOfWeek = observer(() => {
  function updateDayOfTheWeek(newVal: string, index: number){
    CalendarState.calendar.daysOfWeek[index] = newVal;
  }
  return (
    <div className="days">
      <h3 className="edit-title">Days of the Week</h3>
      <div className="gray-box">
        {EditCalendarState.calendar.daysOfWeek.map((day, i) => (
          <CalendarEditDay dayIndex={i} />
        ))}
      </div>
    </div>
  );
});

export default CalendarEditDaysOfWeek;
