import React from "react";
import MonthView from "./MonthView";
import {observer} from "mobx-react";
import CalendarState from "./State/CalendarState";
import Modal from "./Modal";

const CalendarView = observer(() => {
  return (
    <div className="calendar">
      <div>{CalendarState.currentYear}</div>
      <div className="calendar-months">
        {
          CalendarState.calendar.months.map(x => 
            <MonthView key={x.position} monthNumber={x.position}/>,
            )
        }
      </div>
      <Modal title="Foo" visible={!!CalendarState.selectedDay} onTryClose={() => CalendarState.selectedDay = undefined}>
        <div>Test</div>
      </Modal>
    </div>
  );
});

// export default function Calendar() {
//   return (
//     <div className="calendar">
//       {
//         GreyhawkCalendar.months.map(x => 
//           <MonthView weekLength={appState.weekLength} key={x.position} month={x}/>,
//           )
//       }
//     </div>
//   );
// }

export default CalendarView;
