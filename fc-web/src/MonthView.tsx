import React from "react";
import CalendarDay from "./CalendarDay";
import chunks from "./Utililty";
import FantasyDate from "./Models/FantasyDate";
import { observer } from "mobx-react";
import CalendarState from "./State/CalendarState";

const MonthView = observer((props: { monthNumber: number }) => {
  const month = CalendarState.calendar.months[props.monthNumber - 1];
  const days = Array.from({ length: month.days }, (v, i) => i + 1);
  const weeks = chunks(days, CalendarState.calendar.weekLength);
  return (
    <div className="month">
      <div>{month.name}</div>
      <div className="month-days">
        {
          weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="week">
              {week.map((x, i) => {
                const fantasyDate: FantasyDate = { 
                  year: CalendarState.currentYear, 
                  dayOfMonth: x, 
                  month: props.monthNumber} ;
                return <CalendarDay key={i} date={fantasyDate} />;
              })}
            </div>
          ))
        }
      </div>
    </div>
  );
});

export default MonthView;

// export default function MonthView(props: { monthNumber: number }) {
//   const days = Array.from({ length: props.month.days }, (v, i) => i + 1);
//   const weeks = chunks(days, props.yearSettings.weekLength);
//   return (
//     <div>
//       <div>{props.month.name}</div>
//       <div className="month">
//         {
//           weeks.map(week => (
//             <div className="week">
//               {week.map(x => {
//                 const fantasyDate: FantasyDate = {dayOfMonth: x, }
//               })}
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   );
// }
