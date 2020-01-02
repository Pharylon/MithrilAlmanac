import React from "react";
import CalendarDay from "./CalendarDay";
import { chunks } from "../Utility";
import FantasyDate from "../Models/FantasyDate";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import {CheckIfLeapYear} from "../Models/CalendarModel";

const MonthView = observer((props: { monthNumber: number, offsetDays: number, year: number }) => {
  const hasEvents = CalendarState.events.length === 0 || CalendarState.events
    .some(x => x.fantasyDate.year === props.year && x.fantasyDate.month === props.monthNumber);
  // console.log(props.monthNumber + " HAS EVENTS", hasEvents);
  function getOffSetDays(): number {
    if (CalendarState.calendar.resetWeekAtMonthStart){
      return 0;
    }
    const prevMonths = CalendarState.calendar.months.filter(x => x.position < props.monthNumber);
    const previousDays = prevMonths.reduce((total, currMonth) => {
      return total + currMonth.days;
    }, 0);
    let myOffsetDays = props.offsetDays + previousDays % CalendarState.calendar.daysOfWeek.length;
    if (myOffsetDays >= 7) {
      myOffsetDays -= 7;
    }
    return myOffsetDays;
  }
  const offSetDays = getOffSetDays();
  const month = CalendarState.calendar.months.find(x => x.position === props.monthNumber);
  if (!month) {
    return (<React.Fragment></React.Fragment>);
  }
  const isLeapMonth = CheckIfLeapYear(props.year, CalendarState.calendar) && 
    CalendarState.calendar.leapYearRules.month === props.monthNumber;
  const numberOfDayBoxes = month.days + offSetDays + (isLeapMonth ? 1 : 0);
  const days = Array.from({ length: numberOfDayBoxes }, (v, i) => i + 1);
  const weeks = chunks(days, CalendarState.calendar.daysOfWeek.length);
  return (
    <div className={"month" + (hasEvents ? "" : " no-events")}>
      <div className="month-name">{month.name + (hasEvents ? "" : " (no events)")}</div>
      <div>
        {
          weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="week">
              {week.map((x, i) => {
                if (weekIndex === 0 && i < offSetDays) {
                  return (<div key={i} className="day"></div>);
                }
                const fantasyDate: FantasyDate = {
                  year: props.year,
                  dayOfMonth: x - offSetDays,
                  month: props.monthNumber,
                };
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
