import React, { useState } from "react";
import { observer } from "mobx-react";
import "./NewCalendar.css";
import {CalendarTemplates} from "../Models/CalendarTemplates";
import {AddCalendar} from "../DataClients/CalendarEventDataClient";
import { withRouter, Redirect } from "react-router-dom";

const NewCalendar: React.FC = observer(() => {
  const [name, setName] = useState("My Calendar");
  const [calendarId, setCalendar] = useState(CalendarTemplates[0].id);
  const [createdCalendarId, setCreatedCalendarId] = useState("");
  async function createCalendar(){
    const myTemplate = CalendarTemplates.find(x => x.id === calendarId);
    console.log("MyTemplate", myTemplate);
    if (myTemplate){
      const savedCalendarId = await AddCalendar(myTemplate.value);
      console.log("SavedID", savedCalendarId);
      setCreatedCalendarId(savedCalendarId);
    }
  }
  if (createdCalendarId){
    return <Redirect to={`/calendar/${createdCalendarId}`} />;
  }
  return (
    <div className="new-calendar-content">
      <h2>Create A New Calendar</h2>
      <div>
        Let's start by giving your Calendar a name, and selecting a template.
        You'll be able to customize it later.</div>
      <div className="input-combo">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="input-combo">
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
