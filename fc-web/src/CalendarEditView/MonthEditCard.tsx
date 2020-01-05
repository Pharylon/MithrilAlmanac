import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react";
import EditCalendarState from "../State/EditCalendarState";

const MonthEditCard = observer((props: { position: number }) => {
  const month = EditCalendarState.calendar.months.find(x => x.position === props.position);
  if (!month) {
    return (<div>Could not locate month</div>);
  }
  const editMode = props.position === EditCalendarState.monthEditPosition;
  function updateNumDays(newValue: string) {
    if (month) {
      const newNum = parseInt(newValue, 10);
      if (newNum) {
        month.days = newNum;
      }
      else {
        month.days = 0;
      }
    }
  }
  function deleteMonth(){
    const remaining = EditCalendarState.calendar.months.filter(x => x.position !== props.position);
    EditCalendarState.calendar.months = remaining;
  }
  const [showDelete, setShowDelete] = useState(false);
  return (
    <div className={editMode ? "month-edit-mode" : ""}>
      <div>
        {
          editMode ?
            (<input
              value={month.name}
              onChange={(e) => month.name = e.target.value}
            />)
            :
            (<span>{month.name}&nbsp;</span>)
        }
        {
          !editMode && <FontAwesomeIcon
            onClick={() => EditCalendarState.monthEditPosition = props.position}
            className="month-edit-icon" icon={faEdit} />
        }
      </div>
      {
        editMode ?
          (<div className="num-days-in-month">
            <div className="day-input-row">
              <span>Days&nbsp;</span>
              <input
                className="day-num-input"
                onChange={(e) => updateNumDays(e.target.value)}
                type="text"
                value={month.days}></input>
              <button
                onClick={() => EditCalendarState.monthEditPosition = undefined}
                className="edit-month-save">Close</button>
            </div>
          </div>) :
          (<div className="num-days-in-month">
            <span>Days&nbsp;</span>
            <span>{month.days}</span>
          </div>)
      }
      {
        editMode && (
          <div>
            <input onChange={((e) => setShowDelete(!showDelete))} type="checkbox" checked={showDelete} />
            <label>Delete</label>
            {
              showDelete && (
                <div>
                  <button onClick={deleteMonth} className="danger-button">Delete</button>
                </div>
              )
            }
          </div>

        )
      }
    </div>
  );
});

export default MonthEditCard;
