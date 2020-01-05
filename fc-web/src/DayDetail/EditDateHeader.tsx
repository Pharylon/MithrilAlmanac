import React, { useState } from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import CalendarState from "../State/CalendarState";
import FantasyDateSelector from "./FantasyDateSelector";
import FantasyDate, { getDateString } from "../Models/FantasyDate";

const EditDateHeader = observer((props: {date: FantasyDate, updateDate: (date: FantasyDate) => void}) => {
  const editCalendarYearByDefault = CalendarState.calendarEditEvent &&
    CalendarState.calendarEditEvent.fantasyDate.year === 0 &&
    CalendarState.calendarEditEvent.fantasyDate.dayOfMonth === 0;
  const [editMode, setEditMode] = useState(editCalendarYearByDefault);
  if (!CalendarState.calendarEditEvent){
    console.log("Oops! Somehow called EditDateHeader without an edited event selected!");
    return <React.Fragment></React.Fragment>;
  }
  return (
    <div className="event-edit-date">
      {
        !editMode ?
          (<React.Fragment>
            <h2>{getDateString(props.date, CalendarState.calendar)}</h2>
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



export default EditDateHeader;
