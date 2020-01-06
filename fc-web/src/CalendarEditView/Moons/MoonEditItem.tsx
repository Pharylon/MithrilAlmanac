import React, { useState } from "react";
import { observer } from "mobx-react";
import Moon from "../../Models/Moon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import MoonModal from "./MoonModal";

const MoonEditLine = observer((props: { moon: Moon, updateMoon: (moon: Moon | undefined) => void }) => {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="moon-entry">
      <div className="moon-line">
        <div>{props.moon.name}</div>
        <div className="moon" style={{ backgroundColor: props.moon.color }}>&nbsp;</div>
        <FontAwesomeIcon className="fa-moon" icon={faEdit} onClick={() => setModalOpen(true)} />
      </div>
      <div className="moon-cycle">Cycle: {props.moon.daysToCycle} days</div>
      <Modal className="modal-wrapper" isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <MoonModal onClose={() => setModalOpen(false)} moon={props.moon} updateMoon={props.updateMoon}/>
      </Modal>
    </div>
  );
});

export default MoonEditLine;
