import React, { useState } from "react";
import Modal from "react-modal";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { DeleteCalendar } from "../DataClients/CalendarEventDataClient";
import EditCalendarState from "../State/EditCalendarState";

const DangerZone = observer(() => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteButton, setSHowDeleteButton] = useState(false);
  async function deletePressed() {
    await DeleteCalendar(EditCalendarState.calendar.id);
    window.location.assign("/");
  }
  return (
    <div>
      <button onClick={() => setShowModal(true)} className="danger-button bg">Delete</button>
      <Modal className="modal-wrapper" isOpen={showModal} onRequestClose={() => setShowModal(false)}>
        <div className="danger-modal">
          <div>
            {
              `Are you really, really sure you want to delete the calendar ${EditCalendarState.calendar.name}???`
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
                onChange={(e) => setSHowDeleteButton(!showDeleteButton)} />
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
