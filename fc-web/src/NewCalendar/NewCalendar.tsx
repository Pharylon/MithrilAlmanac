import React, { useState } from "react";
import { observer } from "mobx-react";
import "./NewCalendar.css";
import {CalendarTemplates} from "../Models/CalendarTemplates";
import {SaveCalendar} from "../DataClients/CalendarEventDataClient";
import { Redirect } from "react-router-dom";
import UserState from "../State/UserState";
import { CalendarModel } from "../Models/CalendarModel";
import { ViewType } from "../Models/CalendarViewType";

const NewCalendar = observer((props: {close: () => void}) => {
  const [name, setName] = useState("My Calendar");
  const [calendarId, setCalendar] = useState(CalendarTemplates[0].id);
  const [createdCalendarId, setCreatedCalendarId] = useState("");
  async function createCalendar(){
    const myTemplate = CalendarTemplates.find(x => x.id === calendarId);
    if (myTemplate){
      const dto: CalendarModel = {
        ...myTemplate.value,
        name,
        id: "",
        shareId: "",
        defaultView: ViewType.Calendar,
      };
      const savedCalendarId = await SaveCalendar(dto);
      UserState.updateCalendars();
      setCreatedCalendarId(savedCalendarId);
      props.close();
    }
  }
  if (createdCalendarId){
    return <Redirect to={`/edit/${createdCalendarId}`} />;
  }
  return (
    <div className="new-calendar-content">
      <h2>Create A New Calendar</h2>
      <div>
        Let's start by giving your Calendar a name, and selecting a template.
        You'll be able to customize it later.</div>
      <div className="input-combo bk">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="input-combo bk">
        <label>Template</label>
        <select value={calendarId} onChange={(e) => setCalendar(e.target.value)}>
          {
            CalendarTemplates.map(template => (
              <option key={template.id} value={template.id}>{template.longName}</option>
            ))
          }
        </select>
      </div>
      <button onClick={() => createCalendar()}>Create</button>
    </div>
  );
});

export default NewCalendar;
