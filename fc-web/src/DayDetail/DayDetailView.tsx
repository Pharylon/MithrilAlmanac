import React from "react";
import { observer } from "mobx-react";
import FantasyDate, {datesAreEqual} from "../Models/FantasyDate";
import CalendarState from "../State/CalendarState";
import "./DayDetail.css";
import EventDetail from "./EventDetail";


const DayDetailView = observer((props: {date: FantasyDate}) => {
  const monthName = CalendarState.calendar.months[props.date.month - 1].name;
  const events = CalendarState.events.filter(x => datesAreEqual(props.date, x.fantasyDate));
  return (
    <div className="day-detail">
      <h2>{`${monthName} ${getDayString(props.date.dayOfMonth)}, ${props.date.year}`}</h2>
      <div>
        {
        events.map(x => (
          <div key={x.id}>
            <EventDetail event={x} />
          </div>
        ))
        }
      </div>
    </div>
  );
});

function getDayString(dayNum: number){
  if (dayNum === 1){
    return "1st";
  }
  else if (dayNum === 2){
    return "2nd";
  }
  else if (dayNum === 3){
    return "3rd";
  }
  else{
    return dayNum + "th";
  }
}

export default DayDetailView;

