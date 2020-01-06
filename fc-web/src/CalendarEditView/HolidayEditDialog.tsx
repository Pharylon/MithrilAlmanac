import React, { useState } from "react";
import { observer } from "mobx-react";
import EditCalendarState from "../State/EditCalendarState";
import { Holiday } from "../Models/FantasyDate";

interface IHolidayEditDialog {
  onSave: (holiday?: Holiday) => void;
  holiday?: Holiday;
}

const HolidayEditDialog = observer((props: IHolidayEditDialog) => {
  const [name, setName] = useState(props.holiday ? props.holiday.name : "Holiday Name");
  const [month, setMonth] = useState(props.holiday ? props.holiday.date.month : 1);
  const [dayOfMonth, setDay] = useState(props.holiday ? props.holiday.date.dayOfMonth : 1);
  function addHoliday() {
    setName("Holiday Name");
    setMonth(1);
    setDay(1);
    const newHoliday: Holiday = {
      name,
      date: {
        month,
        dayOfMonth,
      },
    };
    props.onSave(newHoliday);
  }
  function setDaySafe(newValue: string) {
    const asInt = parseInt(newValue, 10);
    if (asInt) {
      setDay(asInt);
    }
    else {
      setDay(0);
    }
  }
  return (
    <div>
      <h2>{props.holiday ? "Edit Holiday" : "New Holiday"}</h2>
      <div>
        <div className="input-combo">
          <label htmlFor="new-holiday-name">Name</label>
          <input id="new-holiday-name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="input-combo">
          <label htmlFor="new-month-name">Date</label>
          <label htmlFor="select-month" style={{ display: "none" }}>Month</label>
          <label htmlFor="select-day" style={{ display: "none" }}>Day of Month</label>
          <select id="select-month" value={month} onChange={(e) => setMonth(parseInt(e.target.value, 10))}>
            {
              EditCalendarState.calendar.months.map(x => (
                <option key={x.position} value={x.position}>{x.name}</option>
              ))
            }
          </select>
          <input
            style={{ maxWidth: 50, marginLeft: 10 }}
            type="number"
            value={dayOfMonth}
            onChange={(e) => setDaySafe(e.target.value)}></input>
        </div>
        <div className="month-dialog-buttons">
          <button
            className="add-month-button blue-button"
            onClick={() => addHoliday()}>{props.holiday ? "Close" : "Add"}</button>
          {
            props.holiday && (
              <button
              className="add-month-button danger-button"
              onClick={() => props.onSave(undefined)}>Remove</button>
            )
          }
        </div>

      </div>
    </div>
  );
});

export default HolidayEditDialog;
