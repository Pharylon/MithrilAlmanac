import React from "react";
import CalendarDay from "./CalendarDay";
import { chunks, getCalendarNumber } from "../Utility";
import FantasyDate from "../Models/FantasyDate";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import { CheckIfLeapYear } from "../Models/CalendarModel";
import { GetOffSetInfo } from "../Models/Month";
import { MoonState, GetMoonState } from "../Models/Moon";


const MonthView = observer((props: { monthNumber: number, year: number }) => {
  const hasEvents = CalendarState.events.length === 0 || CalendarState.events
    .some(x => x.fantasyDate.year === props.year && x.fantasyDate.month === props.monthNumber);
  const isLeapYear = CheckIfLeapYear(props.year, CalendarState.calendar);

  const { offSetDays, previousDays } = GetOffSetInfo(CalendarState.calendar, props.monthNumber, props.year);
  // console.log("Offset", offSetDays, props.year, props.monthNumber);
  const month = CalendarState.calendar.months.find(x => x.position === props.monthNumber);
  if (!month) {
    return (<React.Fragment></React.Fragment>);
  }
  const isLeapMonth = isLeapYear && CalendarState.calendar.leapYearRules.month === props.monthNumber;
  const numberOfDayBoxes = month.days + offSetDays + (isLeapMonth ? 1 : 0);
  const days = Array.from({ length: numberOfDayBoxes }, (v, i) => i + 1);
  const weeks = chunks(days, CalendarState.calendar.daysOfWeek.length);

  function getMoonStates(date: FantasyDate): MoonState[] {
    const states = CalendarState.calendar.moons.map(moon => {
      const previousToDate = previousDays + (date.dayOfMonth - 1) - moon.cycleOffset;
      const state = GetMoonState(moon, previousToDate);
      return state;
    });
    return states;
  }
  return (
    <div className={"month" + (hasEvents ? "" : " no-events")}>
      <div className="month-name">{month.name + (hasEvents ? "" : " (no events)")}</div>
      <div>
        {
          weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="week">
              {week.map((x, i) => {
                if (weekIndex === 0 && i < offSetDays) {
                  return (<div
                    key={i}
                    className={"day " + getCalendarNumber(CalendarState.calendar.daysOfWeek.length)}></div>);
                }
                const fantasyDate: FantasyDate = {
                  year: props.year,
                  dayOfMonth: x - offSetDays,
                  month: props.monthNumber,
                };
                return <CalendarDay
                  key={i}
                  date={fantasyDate}
                  moonStates={getMoonStates(fantasyDate)} />;
              })}
            </div>
          ))
        }
      </div>
    </div>
  );
});

export default MonthView;
