import React, { useState } from "react";
import { observer } from "mobx-react";
import UserState from "../State/UserState";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import NewCalendar from "../NewCalendar/NewCalendar";


const CalendarDd: React.FC = observer(() => {
  const [isOpen, setIsOpen] = useState(true);
  const [createModalOpen, setCreateModal] = useState(false);
  function closeCall(){
    setCreateModal(false);
    setIsOpen(false);
  }
  return (
    <div onMouseLeave={() => setIsOpen(false)}>
      <div style={{ fontWeight: isOpen && !createModalOpen ? "bold" : "normal" }}
        className="hover-bold hover-underline"
        onClick={() => setIsOpen(true)}>Calendars</div>
      <div style={{ display: isOpen && !createModalOpen ? "" : "none" }} className="calendar-dd">
        {
          UserState.calendars.map(x => (
            <div key={x.id}>
              <Link className="hover-bold" to={"/calendar/" + x.id}>{x.name}</Link>
            </div>))
        }
        <div className="hover-bold" onClick={() => setCreateModal(true)}>Create New</div>
        <Modal
          className="event-modal"
          isOpen={createModalOpen}
          onRequestClose={() => setCreateModal(false)}
        >
          <NewCalendar close={() => closeCall()}  />
        </Modal>
      </div>
    </div>
  );
});

export default CalendarDd;
