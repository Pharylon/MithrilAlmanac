import React, { useState } from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import CalendarState from "../State/CalendarState";
import FantasyDateSelector from "./FantasyDateSelector";
import FantasyDate from "../Models/FantasyDate";

const EditDateHeader = observer((props: {date: FantasyDate, updateDate: (date: FantasyDate) => void}) => {
  const editCalendarYearByDefault = CalendarState.calendarEditEvent &&
    CalendarState.calendarEditEvent.fantasyDate.year === 0 &&
    CalendarState.calendarEditEvent.fantasyDate.dayOfMonth === 0;
  const [editMode, setEditMode] = useState(editCalendarYearByDefault);
  function getDateString() {
    if (CalendarState.calendarEditEvent) {
      let monthName = "";
      const month = CalendarState.calendar.months.find(x => x.position === props.date.month);
      if (month) {
        monthName = month.name;
      }
      return `${monthName} ${getDayString(props.date.dayOfMonth)}, ${props.date.year}`;
    }
  }
  if (!CalendarState.calendarEditEvent){
    console.log("Oops! Somehow called EditDateHeader without an edited event selected!");
    return <React.Fragment></React.Fragment>;
  }
  return (
    <div className="event-edit-date">
      {
        !editMode ?
          (<React.Fragment>
            <h2>{getDateString()}</h2>
            <span>
              {
                CalendarState.canEditCalendar && (
                  <FontAwesomeIcon icon={faEdit} onClick={() => setEditMode(true)} />
                )
              }
            </span>
          </React.Fragment>)
          :
          (
            <FantasyDateSelector 
              updateDate={props.updateDate}
              date={props.date} />
          )
      }
    </div>
  );
});

function getDayString(dayNum: number) {
  if (dayNum === 1) {
    return "1st";
  }
  else if (dayNum === 2) {
    return "2nd";
  }
  else if (dayNum === 3) {
    return "3rd";
  }
  else {
    return dayNum + "th";
  }
}

export default EditDateHeader;
