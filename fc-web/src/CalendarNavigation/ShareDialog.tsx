import React, { useState } from "react";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAltSquare } from "@fortawesome/free-solid-svg-icons";
import CalendarState from "../State/CalendarState";
import ShareLink from "./ShareLink";

const ShareDialog = observer((props: { id: string }) => {
  const viewLink = `${window.location.protocol}//${window.location.host}/defaultView/${CalendarState.calendar.id}`;
  const editLink = viewLink + "?joinId=" + CalendarState.calendar.shareId;
  const [showOptions, setShowOptions] = useState(false);
  let timeout: number | undefined;
  function onMouseLeave(){
    timeout = window.setTimeout(() => {
      setShowOptions(false);
      timeout = undefined;
    }, 500);
  }
  function onMouseEnter(){
    if (timeout){
      window.clearTimeout(timeout);
    }
  }
  return (
    <div className="share-div" onMouseLeave={() => onMouseLeave()} onMouseEnter={() => onMouseEnter()}>
      <div className="share-div" onClick={() => setShowOptions(!showOptions)}>
        <div>Share</div>
        <div><FontAwesomeIcon className="calendar-toolbar-color" icon={faShareAltSquare} /></div>
      </div>
      <div style={{ display: showOptions ? "" : "none" }} className="share-content">
        <ShareLink id={props.id} link={viewLink} isEdit={false}/>
        {
          CalendarState.canEditCalendar && (
            <ShareLink id={props.id + "-edit"} link={editLink} isEdit={true}/>
          )
        }
      </div>
      <div>
      </div>
    </div>
  );
});

export default ShareDialog;
