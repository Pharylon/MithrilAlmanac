import React from "react";
import FantasyDate, { datesAreEqual, recurringDatesAreEqual } from "../Models/FantasyDate";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import { MoonPhase, MoonState } from "../Models/Moon";
import { getCalendarNumber } from "../Utility";

const CalendarDay = observer((props: { date: FantasyDate, moonStates: MoonState[]}) => {
  const events = CalendarState.events.filter(x => datesAreEqual(x.fantasyDate, props.date));
  function selectDay() {
    if (events.length === 0) {
      CalendarState.addNewEvent(props.date);
    }
    else {
      CalendarState.selectedDay = props.date;
    }
  }
  function getHoliday() {
    if (CalendarState.calendar.holidays) {
      return CalendarState.calendar.holidays.find(x => recurringDatesAreEqual(x.date, props.date));
    }
  }
  const holiday = getHoliday();
  const fullMoons = props.date.year > 0 ? props.moonStates.filter(x => x.phase === MoonPhase.Full) : [];
  const newMoons = props.date.year > 0 ? props.moonStates.filter(x => x.phase === MoonPhase.New) : [];
  function getClass(){
    let myClass = "day day-width " + getCalendarNumber(CalendarState.calendar.daysOfWeek.length);
    if (datesAreEqual(CalendarState.calendar.currentDate, props.date)){
      myClass += " current-day";
    }
    if (events.length){
      myClass += " has-events";
    }
    return myClass;
  }
  return (
    <div className={getClass()}
      onClick={() => selectDay()}>
      <div className="day-of-month">{props.date.dayOfMonth}
        {
          fullMoons.map((moon, i) => (
            <div key={i} style={{ backgroundColor: moon.color }} className="full-moon" title={moon.name}>
            </div>
          ))
        }
        {
          newMoons.map((moon, i) => (
            <div key={i} style={{ borderColor: moon.color}} className="new-moon" title={moon.name}>
            </div>
          ))
        }
      </div>
      <div className="days-events">
        {
          datesAreEqual(CalendarState.calendar.currentDate, props.date) && (
            <div>Current Date</div>
          )
        }
        {
          holiday && <div>{holiday.name}</div>
        }
        {
          events.length > 1 && (<div>{`${events.length} Events`}</div>)
        }
        {events.map(x => (<div key={x.id}>{x.name}</div>))}
      </div>
    </div>
  );
});

export default CalendarDay;

