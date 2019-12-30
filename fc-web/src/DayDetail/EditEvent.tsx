import React, { useState } from "react";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import CalendarEvent from "../Models/CalendarEvent";
import { format, parseISO } from "date-fns";
import { DeleteEvent } from "../DataClients/CalendarEventDataClient";

const EditEvent: React.FC = observer(() => {
  if (!CalendarState.calendarEditEvent) {
    return <div>No Event to edit</div>;
  }
  const [name, setName] = useState(CalendarState.calendarEditEvent.name);
  const [description, setDescription] = useState(CalendarState.calendarEditEvent.description);
  const [realDate, setRealDate] = useState(CalendarState.calendarEditEvent.realDate || new Date());
  async function saveEvent() {
    if (CalendarState.calendarEditEvent) {
      const updateEvent: CalendarEvent = {
        ...CalendarState.calendarEditEvent,
        name,
        description,
        realDate,
      };
      await CalendarState.updateEvent(updateEvent);
      CalendarState.calendarEditEvent = undefined;
    }
  }
  async function deleteEvent() {
    if (CalendarState.calendarEditEvent){
      const myEvent = CalendarState.calendarEditEvent;
      const myIndex = CalendarState.events.findIndex(x => x.id === myEvent.id);
      CalendarState.events.splice(myIndex, 1);
      CalendarState.calendarEditEvent = undefined;
      CalendarState.selectedDay = undefined;
      try{
        await DeleteEvent(myEvent.id);
      }
      catch (e) {
        console.log("Something went wrong when trying to delete an event", e);
        CalendarState.events.push(myEvent);
      }      
    }    
  }
  async function textAreaKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.keyCode === 13 && e.ctrlKey) {
      saveEvent();
    }
  }
  function onRealDateChange(value: string) {
    console.log("OnRealDateChange", value);
    const date = parseISO(value);
    setRealDate(date);
  }
  return (
    <div className="edit-event-area">
      <div>
        <input style={{ fontSize: 18 }} type="string" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <textarea
        value={description}
        onKeyDown={(e) => textAreaKeyDown(e)}
        onChange={(e) => setDescription(e.target.value)} />
      <div className="real-world-date-line">
        <div>Real&nbsp;World&nbsp;Date:&nbsp;</div>
        <input
          type="date"
          value={format(realDate, "yyyy-MM-dd")}
          onChange={(e) => onRealDateChange(e.target.value)} />
      </div>
      <div className="edit-event-buttons">
        <button onClick={() => deleteEvent()}>Delete</button>
        <button onClick={() => saveEvent()}>Save</button>
      </div>
    </div>
  );
});

export default EditEvent;
