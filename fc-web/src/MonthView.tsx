import React from "react";
import CalendarDay from "./CalendarDay";
import chunks from "./Utility";
import FantasyDate from "./Models/FantasyDate";
import { observer } from "mobx-react";
import CalendarState from "./State/CalendarState";

const MonthView = observer((props: { monthNumber: number }) => {
  const month = CalendarState.calendar.months[props.monthNumber - 1];
  const days = Array.from({ length: month.days }, (v, i) => i + 1);
  const weeks = chunks(days, CalendarState.calendar.daysOfWeek.length);
  return (
    <div className="month">
      <div>{month.name}</div>
      <div className="month-days">
        {
          weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="week">
              {week.map((x, i) => {
                const fantasyDate: FantasyDate = { 
                  year: CalendarState.yearView, 
                  dayOfMonth: x, 
                  month: props.monthNumber} ;
                return <CalendarDay key={i} date={fantasyDate} />;
              })}
            </div>
          ))
        }
      </div>
    </div>
  );
});

export default MonthView;
