import React from "react";
import CalendarDay from "./CalendarDay";
import {chunks} from "./Utility";
import FantasyDate from "./Models/FantasyDate";
import { observer } from "mobx-react";
import CalendarState from "./State/CalendarState";

const MonthView = observer((props: { monthNumber: number, offsetDays: number  }) => {
  const prevMonths = CalendarState.calendar.months.filter(x => x.position < props.monthNumber);
  const previousDays = prevMonths.reduce((total, currMonth) => {
    return total + currMonth.days;
  }, 0);
  let offSetDays = props.offsetDays + previousDays % CalendarState.calendar.daysOfWeek.length;
  if (offSetDays >= 7){
    offSetDays -= 7;
  }
  const month = CalendarState.calendar.months.find(x => x.position === props.monthNumber);
  if (!month){
    return(<React.Fragment></React.Fragment>);
  }
  const isLeapMonth = CalendarState.isLeapYear() && CalendarState.calendar.leapYearRules.month === props.monthNumber;
  const numberOfDayBoxes = month.days + offSetDays + (isLeapMonth ? 1 : 0);
  const days = Array.from({ length: numberOfDayBoxes }, (v, i) => i + 1);
  const weeks = chunks(days, CalendarState.calendar.daysOfWeek.length);
  return (
    <div className="month">
      <div className="month-name">{month.name}</div>
      <div>
        {
          weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="week">
              {week.map((x, i) => {
                if (weekIndex === 0 && i < offSetDays){
                  return (<div key={i} className="day"></div>);
                }
                const fantasyDate: FantasyDate = { 
                  year: CalendarState.yearView, 
                  dayOfMonth: x - offSetDays, 
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
