import React from "react";
import FantasyDate, { datesAreEqual } from "./Models/FantasyDate";
import { observer } from "mobx-react";
import CalendarState from "./State/CalendarState";

const CalendarDay = observer((props: { date: FantasyDate }) => {
  const events = CalendarState.events.filter(x => datesAreEqual(x.fantasyDate, props.date));
  const style = events.length === 0 ? "day" : "day has-events";
  return (
    <div className={style}
        onClick={() => CalendarState.selectedDay = props.date}>
        <div>{props.date.dayOfMonth}</div>
        <div className="days-events">
          {
            events.length > 1 && (<div>{`${events.length} Events`}</div>)
          }
          {events.map(x => (<div key={x.id}>{x.name}</div>))}
        </div>
      </div>
  );
});

export default CalendarDay;

