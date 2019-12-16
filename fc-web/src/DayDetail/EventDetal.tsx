import React, { useState } from "react";
import { observer } from "mobx-react";
import "./DayDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import CalendarEvent from "../Models/CalendarEvent";
import {UpsertEvent} from "../DataClients/CalendarEventDataClient";

const DayDetailView = observer((props: {event: CalendarEvent}) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(props.event.name);
  const [description, setDescription] = useState(props.event.description);
  async function saveEvent(){
    setEditMode(false);
    const updateEvent: CalendarEvent = {
      ...props.event,
      name,
      description,
    };
    await UpsertEvent(updateEvent);
  }
  if (!editMode){
    return (
      <div>
        <h3>
          {name}&nbsp;
          <FontAwesomeIcon icon={faEdit} onClick={() => setEditMode(true)} />
        </h3>
        <div className="event-description">{description}</div>
      </div>
    );
  }
  else{
    return (
      <div>
        <div>
          <input style={{fontSize: 18}} type="string" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)}/>
        <button onClick={() => saveEvent()}>Save</button>
      </div>
    );
  }
});

export default DayDetailView;

