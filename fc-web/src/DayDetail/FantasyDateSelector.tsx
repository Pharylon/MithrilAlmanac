import React, { useState, useEffect } from "react";
import FantasyDate from "../Models/FantasyDate";
import Month from "../Models/Month";

const FantasyDateSelector = (props: {date: FantasyDate, months: Month[], updateDate: (date: FantasyDate) => void}) => {
  const [monthValue, setMonthValue] = useState(props.date.month);
  const [dayValue, setDayValue] = useState(props.date.dayOfMonth);
  const [yearValue, setYearValue] = useState(props.date.year);

  useEffect(() => {
    setMonthValue(props.date.month);
    setDayValue(props.date.dayOfMonth);
    setYearValue(props.date.year);
  }, [props.date.month, props.date.dayOfMonth, props.date.year]);

  function updateMonth(newValue: string){
    const updatePosition = parseInt(newValue, 10);
    if (updatePosition && updatePosition > 0){
      setMonthValue(updatePosition);
      props.updateDate({
        month: updatePosition,
        dayOfMonth: dayValue,
        year: yearValue,
      });
    }
  }
  function updateDay(newValue: string){
    const updatedDay = parseInt(newValue, 10);
    if (updatedDay && updatedDay > 0){
      setDayValue(updatedDay);
      props.updateDate({
        month: monthValue,
        dayOfMonth: updatedDay,
        year: yearValue,
      });
    }
    else{
      setDayValue(0);
      props.updateDate({
        month: monthValue,
        dayOfMonth: 0,
        year: yearValue,
      });
    }
  }
  function updateYear(newValue: string){
    const updatedYear = parseInt(newValue, 10);
    if (updatedYear && updatedYear > 0){
      setYearValue(updatedYear);
      props.updateDate({
        month: monthValue,
        dayOfMonth: dayValue,
        year: updatedYear,
      });
    }
  }
  return (
    <div className="edit-event-date">
      <div className="edit-event-date-combo">
        <label>Month</label>
        <select value={monthValue} onChange={(e) => updateMonth(e.target.value)}>
          {props.months.map(x => 
            (<option key={x.position} value={x.position}>{x.name}</option>),
          )}
        </select>
      </div>
      <div className="edit-event-date-combo">
        <label>Day</label>
        <input type="number" value={dayValue} onChange={(e) => updateDay(e.target.value)}/>
      </div>
      <div className="edit-event-date-combo">
        <label>Year</label>
        <input type="number" value={yearValue} onChange={(e) => updateYear(e.target.value)}/>
      </div>
    </div>
  );
};

export default FantasyDateSelector;
