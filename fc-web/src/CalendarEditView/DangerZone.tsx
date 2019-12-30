import React, { useState } from "react";
import Modal from "react-modal";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import { DeleteCalendar } from "../DataClients/CalendarEventDataClient";

const DangerZone = observer(() => {
  const [showModal, setShowModal] = useState(false);
  async function deletePressed(){
    await DeleteCalendar(CalendarState.calendar.id);
    CalendarState.reset();
  }
  return (
    <div>
      <button onClick={() => setShowModal(true)} className="danger-button">Delete</button>
      <Modal className="event-modal" isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <div className="danger-modal">
          <div>
          {
            `Are you really, really sure you want to delete the calendar ${CalendarState.calendar.name}???`
          }
          </div>
          <div>THIS OPERATION CANNOT BE UNDONE!</div>
          <div className="delete-buttons">
            <button 
              className="no-delete-btn" 
              onClick={() => setShowModal(false)}>No, Don't Delete this Calendar</button>
          </div>
          <button 
            onClick={() => deletePressed()} 
            className="yes-delete-btn">Yes, I really want to delete this calendar</button>
        </div>
      </Modal>
    </div>
  );
});

export default DangerZone;
