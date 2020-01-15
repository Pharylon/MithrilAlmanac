import React, { useState } from "react";
import { observer } from "mobx-react";
import EditCalendarState from "../../State/EditCalendarState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import ErrorState from "../../State/ErrorState";

const CalendarEditDay = observer((props: { dayIndex: number }) => {
  const [dayName, setDayName] = useState(EditCalendarState.calendar.daysOfWeek[props.dayIndex]);
  function updateDayOfTheWeek() {
    const duplicates = EditCalendarState.calendar.daysOfWeek.some((x, i) => x === dayName && i !== props.dayIndex);
    if (duplicates){
      console.log("DUP!");
      ErrorState.errorMessage = "A day with that name already exists";
    }
    else{
      if (dayName){
        EditCalendarState.calendar.daysOfWeek[props.dayIndex] = dayName;
        EditCalendarState.dayEditPosition = undefined;
      }
      else{
        deleteDay();
      }      
    }    
  }
  function deleteDay(){
    const newDays = [...EditCalendarState.calendar.daysOfWeek];
    newDays.splice(props.dayIndex, 1);
    EditCalendarState.calendar.daysOfWeek = newDays;
    EditCalendarState.dayEditPosition = undefined;
  }
  return (
    <div className="edit-day-line">
      {
        EditCalendarState.dayEditPosition !== props.dayIndex ?
          (<div>{dayName}</div>) :
          (<input type="text" value={dayName} onChange={(e) => setDayName(e.target.value)} />)
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
