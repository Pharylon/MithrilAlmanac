import React from "react";
import GreyhawkCalendar from "../../Models/GreyhawkCalendar";
import MonthView from "./Month";

export default function Calendar() {
  return (
    <div>
      {
        GreyhawkCalendar.months.map(x => <MonthView key={x.position} month = {x}/>)
      }
    </div>
  );
}
