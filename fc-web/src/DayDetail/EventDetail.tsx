import React, { useState } from "react";
import { observer } from "mobx-react";
import "./DayDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import CalendarEvent from "../Models/CalendarEvent";
import {UpsertEvent} from "../DataClients/CalendarEventDataClient";
import CalendarState from "../State/CalendarState";

const DayDetailView = observer((props: {event: CalendarEvent, defaultEdit: boolean}) => {
  const [name, setName] = useState(props.event.name);
  const [description, setDescription] = useState(props.event.description);
  async function textAreaKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>){
    if (e.keyCode === 13 && e.ctrlKey){
      saveEvent();
    }
  }
  async function saveEvent(){
    CalendarState.calendarEventEditId = "";
    const updateEvent: CalendarEvent = {
      ...props.event,
      name,
      description,
    };
    await UpsertEvent(updateEvent);
  }
  function startEdit(){
    CalendarState.calendarEventEditId = props.event.id;
  }
  if (CalendarState.calendarEventEditId !== props.event.id){
    return (
      <div>
        <h3>
          {name}&nbsp;
          <FontAwesomeIcon icon={faEdit} onClick={() => startEdit()} />
        </h3>
        <div className="event-description">
          {
            description.split("\n").map((x, i) => (<div style={{marginBottom: 5}} key={i}>{x}</div>))
          }
        </div>
      </div>
    );
  }
  else{
    return (
      <div className="edit-event-area">
        <div>
          <input style={{fontSize: 18}} type="string" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <textarea 
          value={description} 
          onKeyDown={(e) => textAreaKeyDown(e) } 
          onChange={(e) => setDescription(e.target.value)}/>
        <button onClick={() => saveEvent()}>Save</button>
      </div>
    );
  }
});

export default DayDetailView;

