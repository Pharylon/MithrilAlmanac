import React, { Fragment } from "react";
import { observer } from "mobx-react";
import CalendarState from "../../State/CalendarState";
import CondensedElement, { MonthEvents, EventMonthFiller } from "./CondensedInterfaces";
import CondensedViewElement from "./CondensedViewBlock";

const CondensedViewYear = observer((props: { year: number, final: boolean, first: boolean }) => {
  const yearEvents = CalendarState.events.filter(x => x.fantasyDate.year === props.year);
  const condensedViewObjects = CalendarState.calendar.months.reduce<CondensedElement[]>((acc, m) => {
    const monthEvents = yearEvents.filter(x => x.fantasyDate.month === m.position);
    if (monthEvents.length) {
      const myObj: MonthEvents = {
        month: m.position,
        events: monthEvents,
        isMonthEvent: true,
      };
      return [...acc, myObj];
    }
    else {
      if (acc.length && !acc[acc.length - 1].isMonthEvent) {
        const filler = acc[acc.length - 1] as EventMonthFiller;
        filler.months.push(m);
        filler.days += m.days;
        return acc;
      }
      else {
        const myObj: EventMonthFiller = {
          months: [m],
          days: m.days,
          isMonthEvent: false,
        };
        return [...acc, myObj];
      }
    }
  }, []);
  if (props.final){
    while (condensedViewObjects.length && !condensedViewObjects[condensedViewObjects.length - 1].isMonthEvent){
      condensedViewObjects.pop();
    }
  }  
  if (props.first){
    while (condensedViewObjects.length && !condensedViewObjects[0].isMonthEvent){
      condensedViewObjects.splice(0, 1);
    }
  } 
  return (
    <Fragment>
        {
          condensedViewObjects.map((x, i) => (<CondensedViewElement key={i} year={props.year} obj={x}/>))
        }
    </Fragment>
  );
});

export default CondensedViewYear;
