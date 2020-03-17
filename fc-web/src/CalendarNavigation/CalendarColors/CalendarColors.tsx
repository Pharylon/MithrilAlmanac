import React, { useState } from "react";
import { observer } from "mobx-react";
import EditState from "../../State/EditCalendarState";
import ColorPicker from "./CalendarColorPicker";
import "./CalendarColors.css";
import DefaultColor from "./DefaultColor";
import { SaveCalendar } from "../../DataClients/CalendarEventDataClient";
import CalendarState from "../../State/CalendarState";
import CalendarColorState from "./CalendarColorState";
import Modal from "react-modal";
import DeepEqual from "deep-equal";


const CalendarColor: React.FC = observer(() => {
  const [showDismissConfirm, setShowDismiss] = useState(false);
  function save() {
    SaveCalendar(CalendarColorState.calendar);
  }
  function hide() {
    if (!DeepEqual({...CalendarState.calendar.colorOptions}, {...CalendarColorState.calendar.colorOptions})) {
      setShowDismiss(true);
    }
    else{
      CalendarColorState.hide();
    }
  }
  return (
    <Modal
      className="modal-wrapper"
      isOpen={CalendarColorState.visible}
      onRequestClose={() => hide()}>
      <div className="standard-modal-inner">
        <div>
          <h3>Calendar Colors</h3>
          <DefaultColor />
          <div>
            <button onClick={save} className="orange-button bg">CANCEL</button>
            <button onClick={save} className="blue-button bg">SAVE</button>
          </div>
        </div>
      </div>
      <Modal
        className="modal-wrapper"
        isOpen={showDismissConfirm}>
        <div className="standard-modal-inner sm">
          You have unsaved changes
        </div>
      </Modal>
    </Modal>

  );
});

export default CalendarColor;
