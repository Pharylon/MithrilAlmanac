import React from "react";
import MonthView from "./MonthView";
import { observer } from "mobx-react";
import CalendarState from "./State/CalendarState";
import Modal from "react-modal";
import DayDetailView from "./DayDetailView";


const CalendarView = observer(() => {
  const myApp = document.getElementById("calendar");
  if (myApp) {
    Modal.setAppElement(myApp);
  }
  return (
    <div className="calendar" id="calendar">
      <div>{CalendarState.currentYear}</div>
      <div className="calendar-months">
        {
          CalendarState.calendar.months.map(x =>
            <MonthView key={x.position} monthNumber={x.position} />,
          )
        }
      </div>
      {
        CalendarState.selectedDay && (
          <Modal
            isOpen={!!CalendarState.selectedDay}
            onRequestClose={() => CalendarState.selectedDay = undefined}>
            <DayDetailView date={CalendarState.selectedDay} />
          </Modal>
        )
      }

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
