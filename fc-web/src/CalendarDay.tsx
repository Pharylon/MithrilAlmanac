import React from "react";
import FantasyDate, { datesAreEqual } from "./Models/FantasyDate";
import { observer } from "mobx-react";
import CalendarState from "./State/CalendarState";

const CalendarDay = observer((props: { date: FantasyDate }) => {
  const events = CalendarState.events.filter(x => datesAreEqual(x.fantasyDate, props.date));
  function selectDay(){
    if (events.length === 0){
      CalendarState.addNewEvent(props.date);
    }
    else{
      CalendarState.selectedDay = props.date;
    }
  }
  function getHoliday(){
    if (CalendarState.calendar.holidays){
      return CalendarState.calendar.holidays.find(x => 
        x.date.month === props.date.month && x.date.dayOfMonth === props.date.dayOfMonth);
    }
  }
  const holiday = getHoliday();    
  return (
    <div className={events.length === 0 && !holiday ? "day" : "day has-events"}
        onClick={() => selectDay()}>
        <div>{props.date.dayOfMonth}</div>
        <div className="days-events">
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

