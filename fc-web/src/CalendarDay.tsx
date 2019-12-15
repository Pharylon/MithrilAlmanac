import React, { useState } from "react";
import FantasyDate, { datesAreEqual } from "./Models/FantasyDate";
import { observer } from "mobx-react";
import CalendarState from "./State/CalendarState";
import LongPress from "./LongPress";

const CalendarDay = observer((props: { date: FantasyDate }) => {
  const events = CalendarState.events.filter(x => datesAreEqual(x.fantasyDate, props.date));
  const [showPopUp, setShowPopup] = useState(false);
  let timeout: number = -1;
  function onHover() {
    timeout = window.setTimeout(() => {
      if (timeout > 0) {
        clearTimeout(timeout);
      }
      setShowPopup(true);
    }, (100));
  }
  function onLeave() {
    clearTimeout(timeout);
    setShowPopup(false);
  }
  return (
    <LongPress 
        time={500} 
        onPress={() => setShowPopup(false)} 
        onLongPress={() => setShowPopup(true)}>
      <div className="day"
        onMouseEnter={onHover}
        onClick={() => CalendarState.selectedDay = props.date}
        onMouseLeave={onLeave}>
        <div>{props.date.dayOfMonth}</div>
        <div>{events.length > 0 ? "•" : ""}</div>
        <div className={showPopUp && events.length ? "day-events" : "hide"}>
          {
            events.map(x => <div key={x.id}>{x.name}</div>)
          }
        </div>
      </div>
    </LongPress>
  );
});

export default CalendarDay;

