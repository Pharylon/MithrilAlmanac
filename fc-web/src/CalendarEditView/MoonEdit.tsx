import React from "react";
import { observer } from "mobx-react";
import "./Moons.css";
import EditCalendarState from "../State/EditCalendarState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const MoonEdit: React.FC = observer(() => {
  return (
    <div className="moons">
      <h3 className="edit-title">Moons</h3>
      <div className="gray-box">
        {
          EditCalendarState.calendar.moons.map((moon, i) => (
            <div key={i} className="moon-entry">
              <div className="moon-line">
                <div>{moon.name}</div>
                <div className="moon" style={{ backgroundColor: moon.color }}>&nbsp;</div>
                <FontAwesomeIcon className="fa-moon" icon={faEdit} />
              </div>
              <div className="moon-cycle">Cycle: {moon.daysToCycle} days</div>
            </div>
          ))
        }
      </div>
    </div>
  );
});

export default MoonEdit;
