import React from "react";
import { observer } from "mobx-react";
import CalendarState from "../../State/CalendarState";
import CondensedViewYear from "./CondensedViewYear";
import { CreateRange } from "../../Utility/Range";

const CondensedView: React.FC = observer(() => {
  const gappedYears = [...new Set(CalendarState.events.map(x => x.fantasyDate.year))];
  gappedYears.sort();
  const years = CreateRange(gappedYears[0], gappedYears[gappedYears.length - 1]);
  const finalYear = years[years.length - 1];
  return (
    <div>
      <div className="calendar-months">
        {
          years.map((year, i) => (
            <CondensedViewYear year={year} key={i} final={year === finalYear} first={year === years[0]} />
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
