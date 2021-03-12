import React, { useState } from "react";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import CalendarEvent from "../Models/CalendarEvent";
import { format, parseISO } from "date-fns";
import { DeleteEvent } from "../DataClients/CalendarEventDataClient";
import UserState from "../State/UserState";
import FantasyDateSelector from "./FantasyDateSelector";
import CalendarEventEditModel from "../Models/CalendarEventEditModel";

const EditEvent: React.FC = observer(() => {
  if (!CalendarState.calendarEditEvent) {
    return <div>No Event to edit</div>;
  }
  const [name, setName] = useState(CalendarState.calendarEditEvent.calendarEvent.name);
  const [description, setDescription] = useState(CalendarState.calendarEditEvent.calendarEvent.description);
  const [realDate, setRealDate] = useState<Date | undefined>(CalendarState.calendarEditEvent.calendarEvent.realDate);
  const [fantasyDate, setFantasyDate] = useState(CalendarState.calendarEditEvent.calendarEvent.fantasyDate);
  const [hidden, setHidden] = useState(CalendarState.calendarEditEvent.calendarEvent.hidden);
  const [makeCurrentDate, setMakeCurrentDate] = useState(false);
  async function saveEvent() {
    if (CalendarState.calendarEditEvent) {
      const updateEvent: CalendarEvent = {
        ...CalendarState.calendarEditEvent.calendarEvent,
        name,
        description,
        realDate,
        fantasyDate,
        hidden,
      };
      const updateModel: CalendarEventEditModel = {
        calendarEvent: updateEvent,
        makeCurrentDate
      }
      await CalendarState.updateEvent(updateModel);
      CalendarState.calendarEditEvent = undefined;
      if (CalendarState.selectedDay && CalendarState.selectedDay !== fantasyDate) {
        CalendarState.selectedDay = fantasyDate;
      }
      if (makeCurrentDate){
        CalendarState.calendar.currentDate = fantasyDate;
      }
    }
  }
  async function deleteEvent() {
    if (CalendarState.calendarEditEvent) {
      const myEvent = CalendarState.calendarEditEvent;
      const myIndex = CalendarState.events.findIndex(x => x.id === myEvent.calendarEvent.id);
      CalendarState.events.splice(myIndex, 1);
      CalendarState.calendarEditEvent = undefined;
      CalendarState.selectedDay = undefined;
      try {
        await DeleteEvent(myEvent.calendarEvent.id);
      }
      catch (e) {
        console.error("Something went wrong when trying to delete an event", e);
        CalendarState.events.push(myEvent.calendarEvent);
      }
    }
  }
  async function textAreaKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.keyCode === 13 && e.ctrlKey) {
      saveEvent();
    }
  }
  function onRealDateChange(value: string) {
    if (value) {
      const date = parseISO(value);
      setRealDate(date);
    }
    else {
      setRealDate(undefined);
    }
  }
  function getRealDateValue() {
    if (realDate) {
      return format(realDate, "yyyy-MM-dd");
    }
    return "";
  }
  return (
    <div className="standard-modal-inner">
      <div className="event-edit-date">
        <FantasyDateSelector
          calendarModel={CalendarState.calendar}
          updateDate={setFantasyDate}
          date={fantasyDate} />
      </div>
      <div className="edit-event-area">
        <div>
          <input style={{ fontSize: 18 }} type="string" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <textarea
          value={description}
          onKeyDown={(e) => textAreaKeyDown(e)}
          onChange={(e) => setDescription(e.target.value)} />
        <div className="real-world-date-line">
          <div>Real World Date:&nbsp;</div>
          <input
            type="date"
            value={getRealDateValue()}
            onChange={(e) => onRealDateChange(e.target.value)} />
        </div>
        {
          (!CalendarState.calendarEditEvent.calendarEvent.createUser ||
            (UserState.userModel &&
              CalendarState.calendarEditEvent.calendarEvent.createUser === UserState.userModel.id)) &&
          (<div className="hidden-line">
            <div><input id="hidden" type="checkbox" checked={hidden} onChange={() => setHidden(!hidden)} /></div>
            <label htmlFor="hidden">Hidden</label>
            <div><input id="currentDate" type="checkbox" checked={makeCurrentDate} onChange={() => setMakeCurrentDate(!makeCurrentDate)} /></div>
            <label htmlFor="currentDate">&nbsp;Current Date</label>
          </div>)
        }

        <div className="edit-event-buttons">
          <button onClick={() => deleteEvent()}>Delete</button>
          <button onClick={() => saveEvent()}>Save</button>
        </div>
      </div>
    </div>
  );
});


export default EditEvent;
