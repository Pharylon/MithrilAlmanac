import React, { Fragment } from "react";
import { observer } from "mobx-react";
import CondensedElement from "./CondensedInterfaces";
import MonthView from "../MonthView";
import CalendarState from "../../State/CalendarState";
import { getCalendarNumber } from "../../Utility";
import { NumbersToWords } from "../../Utility/NumbersToWords";

const CondensedViewElement = observer((props: { obj: CondensedElement, year: number }) => {
  return (
    <Fragment>
      {
        props.obj.isMonthEvent ?
          (
            <MonthView
              year={props.year}
              monthNumber={props.obj.month} />
          ) : (
            <div className="month no-events">
              <div>{`${NumbersToWords(props.obj.months.length)} month(s) with no events`}</div>
              <div>
                {
                  props.obj.months.map((x, i) => <div key={i}>{`${x} ${props.year}`}</div>)
                }
              </div>
              <div className="week">
                {
                  CalendarState.calendar.daysOfWeek.map(x => (
                    <div key={x} className={"day " + getCalendarNumber(CalendarState.calendar.daysOfWeek.length)}></div>
                  ))
                }
              </div>
            </div>
          )
      }
    </Fragment>
  );
});

export default CondensedViewElement;
