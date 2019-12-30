import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react";
import CalendarEditState from "../State/CalendarEditState";

const MonthEditCard = observer((props: { position: number }) => {
  const month = CalendarEditState.calendar.months.find(x => x.position === props.position);
  if (!month){
    return (<div>Could not locate month</div>);
  }
  const editMode = props.position === CalendarEditState.monthEditPosition;
  function updateNumDays(newValue: string){
    if (month){
      const newNum = parseInt(newValue, 10);
      if (newNum){
        month.days = newNum;
      }
      else{
        month.days = 0;
      }
    }    
  }
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
          onClick={() => CalendarEditState.monthEditPosition = props.position}
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
                onClick={() => CalendarEditState.monthEditPosition = undefined}
                className="edit-month-save">Close</button>
            </div>
          </div>) :
          (<div className="num-days-in-month">
            <span>Days&nbsp;</span>
            <span>{month.days}</span>
          </div>)
      }
    </div>
  );
});

export default MonthEditCard;
