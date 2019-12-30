import React from "react";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";

const TimeLineView: React.FC = observer(() => {
  const events = [...CalendarState.events];
  events.sort((a, b) => {
    if (a.fantasyDate.year !== b.fantasyDate.year){
      return a.fantasyDate.year - b.fantasyDate.year;
    }
    else if (a.fantasyDate.month !== b.fantasyDate.month){
      return a.fantasyDate.month - b.fantasyDate.month;
    }
    else {
      return a.fantasyDate.dayOfMonth - b.fantasyDate.dayOfMonth;
    }
  });
  return (
    <div>
      {
        events.map(x => (
          <div>{x.name}</div>
        ))
      }
    </div>
  );
});

export default TimeLineView;
