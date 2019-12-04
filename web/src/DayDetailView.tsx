import React from "react";
import { observer } from "mobx-react";
import FantasyDate from "./Models/FantasyDate";
import CalendarState from "./State/CalendarState";


const DayDetailView = observer((props: {date: FantasyDate}) => {
  const monthName = CalendarState.calendar.months[props.date.month - 1].name;
  return (
    <div className="month">
      <div>{`${monthName} ${getDayString(props.date.dayOfMonth)} ${props.date.year}`}</div>
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

