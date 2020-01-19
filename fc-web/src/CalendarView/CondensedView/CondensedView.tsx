import React from "react";
import { observer } from "mobx-react";
import CalendarState from "../../State/CalendarState";
import CalendarEvent from "../../Models/CalendarEvent";
import CondensedViewYear from "./CondensedViewYear";



const CondensedView: React.FC = observer(() => {
  const years = [...new Set(CalendarState.events.map(x => x.fantasyDate.year))];
  years.sort();
  // for (let year = firstDate.year; year <= lastDate.year; year++) {
  //   for (let monthIndex = 1; monthIndex <= CalendarState.calendar.months.length; monthIndex++) {
  //     const myEvents = events.filter(x => x.fantasyDate.month === monthIndex && x.fantasyDate.year === year);
  //     if (myEvents.length){
  //       const myMonthEvent: MonthEvents = {
  //         year,
  //         month: monthIndex,
  //         events: myEvents,
  //       };

  //     }
  //     if (greaterThanFirst && lessThanLast) {
  //       myElements.push({
  //         month: monthIndex,
  //         year,
  //         events: events.filter(x => x.fantasyDate.month === monthIndex && x.fantasyDate.year === year),
  //       });
  //     }
  //   }
  // }
  const firstYear = years[0];
  const finalYear = years[years.length - 1];
  return (
    <div>
      <div className="calendar-months">
        {
          years.map(year => (
            <CondensedViewYear year={year} key={year} final={year === finalYear} first={year === years[0]} />
          ))
        }
      </div>
      <div className="condensed-bottom">
        <div>
          <button
            onClick={() => CalendarState.addNewEvent(CalendarState.calendar.currentDate)}
            className="add-event-button">
            <span>Add New Event</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default CondensedView;
