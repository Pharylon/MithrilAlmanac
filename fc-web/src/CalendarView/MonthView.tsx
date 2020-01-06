import React from "react";
import CalendarDay from "./CalendarDay";
import { chunks } from "../Utility";
import FantasyDate from "../Models/FantasyDate";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import { CheckIfLeapYear } from "../Models/CalendarModel";
import { GetOffSetInfo } from "../Models/Month";
import { MoonPhase, MoonState } from "../Models/Moon";

const MonthView = observer((props: { monthNumber: number, year: number }) => {
  const hasEvents = CalendarState.events.length === 0 || CalendarState.events
    .some(x => x.fantasyDate.year === props.year && x.fantasyDate.month === props.monthNumber);
  const isLeapYear = CheckIfLeapYear(props.year, CalendarState.calendar);

  const { offSetDays, previousDays } = GetOffSetInfo(CalendarState.calendar, props.monthNumber, props.year);
  const month = CalendarState.calendar.months.find(x => x.position === props.monthNumber);
  if (!month) {
    return (<React.Fragment></React.Fragment>);
  }
  const isLeapMonth = isLeapYear && CalendarState.calendar.leapYearRules.month === props.monthNumber;
  const numberOfDayBoxes = month.days + offSetDays + (isLeapMonth ? 1 : 0);
  const days = Array.from({ length: numberOfDayBoxes }, (v, i) => i + 1);
  const weeks = chunks(days, CalendarState.calendar.daysOfWeek.length);

  // const expectedNewMoons = new Map<number, number>();
  // expectedNewMoons.set(1, 10);
  // expectedNewMoons.set(2, 9);
  // expectedNewMoons.set(3, 9);
  // expectedNewMoons.set(4, 8);
  // expectedNewMoons.set(5, 7);
  // expectedNewMoons.set(6, 5);
  // expectedNewMoons.set(7, 5);
  // expectedNewMoons.set(8, 3);
  // expectedNewMoons.set(9, 2);
  // expectedNewMoons.set(10, 1);
  // expectedNewMoons.set(11, 30);

  function getMoonStates(date: FantasyDate): MoonState[] {
    function getMoonFullPercentage(cycles: number){
      let myPct = cycles % 1;
      if (myPct < .5){
        myPct = 1 - myPct;
      }
      return myPct;
    }


    return CalendarState.calendar.moons.map(moon => {
      const previousToDate = previousDays + (date.dayOfMonth - 1) - 25; //moon.cycleOffset;
      const cyclesSinceFirstFullMoon = previousToDate / moon.daysToCycle;
      const moonFullPercentage = getMoonFullPercentage(cyclesSinceFirstFullMoon);
      const sliceSize = 1 / moon.daysToCycle;
      const fullThreshold = 1 - (sliceSize / 2);
      let phase = MoonPhase.None;
      // if (date.month < 3){
      //   console.log(date.month, date.dayOfMonth, moonFullPercentage);
      // }
      
      if (moonFullPercentage > fullThreshold) {
        // if (expectedNewMoons.has(date.month)){
        //   console.log("Expected: ", expectedNewMoons.get(date.month), "Had: ", date.dayOfMonth, moonFullPercentage);
        // }
        phase = MoonPhase.Full;
      }
      else if (Math.abs(.5 - moonFullPercentage) < sliceSize / 2) {
        phase = MoonPhase.New;
      }
      return {
        ...moon,
        phase,
      };
    });
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
                  return (<div key={i} className="day"></div>);
                }
                const fantasyDate: FantasyDate = {
                  year: props.year,
                  dayOfMonth: x - offSetDays,
                  month: props.monthNumber,
                };
                return <CalendarDay
                  key={i}
                  date={fantasyDate}
                  moonStates={getMoonStates(fantasyDate)}/>;
              })}
            </div>
          ))
        }
      </div>
    </div>
  );
});

export default MonthView;
