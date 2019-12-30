import React, { useState } from "react";
import Modal from "react-modal";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import { DeleteCalendar } from "../DataClients/CalendarEventDataClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const DangerZone = observer(() => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteButton, setSHowDeleteButton] = useState(false);
  async function deletePressed() {
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
            <div style={{ fontSize: 12 }}>
              <input
                type="checkbox"
                checked={showDeleteButton}
                onClick={(e) => setSHowDeleteButton(!showDeleteButton)} />
              <label>I want to delete this calendar</label>
            </div>
          </div>
          {
            showDeleteButton && (<button
              onClick={() => deletePressed()}
              className="yes-delete-btn">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <span>&nbsp;Yes, I really want to delete this calendar&nbsp;</span>
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </button>)
          }
        </div>
      </Modal>
    </div>
  );
});

export default DangerZone;
