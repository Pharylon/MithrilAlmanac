import React, { useState } from "react";
import { observer } from "mobx-react";
import EditCalendarState from "../../State/EditCalendarState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import ErrorState from "../../State/ErrorState";
import Tooltip from "rc-tooltip";

const CalendarEditDay = observer((props: { dayIndex: number }) => {
  const [dayName, setDayName] = useState(EditCalendarState.calendar.daysOfWeek[props.dayIndex]);
  function updateDayOfTheWeek() {
    const duplicates = EditCalendarState.calendar.daysOfWeek.some((x, i) => x === dayName && i !== props.dayIndex);
    if (duplicates) {
      console.log("DUP!");
      ErrorState.errorMessage = "A day with that name already exists";
    }
    else {
      if (dayName) {
        EditCalendarState.calendar.daysOfWeek[props.dayIndex] = dayName;
        EditCalendarState.dayEditPosition = undefined;
      }
      else {
        deleteDay();
      }
    }
  }
  function deleteDay() {
    const newDays = [...EditCalendarState.calendar.daysOfWeek];
    newDays.splice(props.dayIndex, 1);
    EditCalendarState.calendar.daysOfWeek = newDays;
    EditCalendarState.dayEditPosition = undefined;
  }
  
  const toolTip = (
    <div>
      <div>To delete a day, just remove all the text</div>
      <div>and then click the green checkbox</div>
    </div>
  );
  function onTooltipChange(visible: boolean){
    if (!visible){
      EditCalendarState.showDayTooltip = false;
    }
  }
  return (
    <div className="edit-day-line">
      {
        EditCalendarState.dayEditPosition !== props.dayIndex ?
          (<div>{dayName}</div>) :
          (
            <Tooltip 
              onVisibleChange={onTooltipChange} 
              overlay={toolTip} 
              placement="bottom" 
              trigger={"click"} 
              visible={EditCalendarState.showDayTooltip}>
              <input type="text" value={dayName} onChange={(e) => setDayName(e.target.value)} />
            </Tooltip>
          )
      }
      {
        EditCalendarState.dayEditPosition !== props.dayIndex ?
          (
            <div>
              <FontAwesomeIcon icon={faEdit} onClick={() => EditCalendarState.dayEditPosition = props.dayIndex} />
            </div>
          ) :
          (
            <div>
              <FontAwesomeIcon
                className="fa-check"
                icon={faCheckSquare}
                onClick={() => updateDayOfTheWeek()} />
            </div>
          )
      }
    </div>
  );
});

export default CalendarEditDay;
