import React, { Fragment } from "react";
import { observer } from "mobx-react";
import CondensedElement from "./CondensedInterfaces";
import MonthView from "../MonthView";
import CalendarState from "../../State/CalendarState";
import { getCalendarNumber } from "../../Utility";
import { NumbersToWords } from "../../Utility/NumbersToWords";

const CondensedViewElement = observer((props: { obj: CondensedElement, year: number }) => {
  if (props.obj.isMonthEvent) {
    return (<Fragment><MonthView
      year={props.year}
      monthNumber={props.obj.month} /></Fragment>);
  }
  else if (props.obj.months.length === 1) {
    return (<Fragment><MonthView
      year={props.year}
      monthNumber={props.obj.months[0].position} /></Fragment>);
  }
  else {
    return (<Fragment>
      <div className="month no-events">
        <div className="condensed-placeholder">
          {
            props.obj.months.length === CalendarState.calendar.months.length ? (
              <div>
                <div>{`No events in ${props.year}`}</div>
              </div>
            ) : (
                <div>
                  <div>{`${NumbersToWords(props.obj.months.length)} months with no events in ${props.year}`}</div>
                  <div>
                    {`from ${props.obj.months[0].name} to ${props.obj.months[props.obj.months.length - 1].name}`}
                  </div>
                </div>
              )
          }
        </div>
        <div className="week">
          {
            CalendarState.calendar.daysOfWeek.map(x => (
              <div
                key={x}
                style={{ height: 1 }}
                className={"day-width " + getCalendarNumber(CalendarState.calendar.daysOfWeek.length)}></div>
            ))
          }
        </div>
      </div>
    </Fragment>);
  }
});

export default CondensedViewElement;
