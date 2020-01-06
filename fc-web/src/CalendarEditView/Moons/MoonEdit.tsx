import React, { useState } from "react";
import { observer } from "mobx-react";
import "./Moons.css";
import EditCalendarState from "../../State/EditCalendarState";
import Modal from "react-modal";
import MoonEditLine from "./MoonEditItem";
import Moon from "../../Models/Moon";
import MoonModal from "./MoonModal";

const MoonEdit: React.FC = observer(() => {
  const [modalOpen, setModalOpen] = useState(false);
  function addMoon(moon: Moon | undefined) {
    if (moon) {
      EditCalendarState.calendar.moons.push(moon);
    }
  }
  function updateMoon(index: number, moon: Moon | undefined): void {
    if (moon) {
      EditCalendarState.calendar.moons[index] = moon;
    }
    else {
      EditCalendarState.calendar.moons.splice(index, 1);
    }
  }
  return (
    <div className="moons">
      <h3 className="edit-title">Moons</h3>
      <div className="gray-box">
        {
          EditCalendarState.calendar.moons.map((moon, i) => (
            <MoonEditLine moon={moon} updateMoon={(m) => updateMoon(i, m)} key={i} />
          ))
        }
        <button className="blue-button" onClick={() => setModalOpen(true)}>Add Moon</button>
      </div>
      <Modal className="modal-wrapper" isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <MoonModal onClose={() => setModalOpen(false)} updateMoon={addMoon} />
      </Modal>
    </div>
  );
});

export default MoonEdit;
