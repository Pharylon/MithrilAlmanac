import React, { useState } from "react";
import Moon from "../../Models/Moon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "rc-tooltip";
import ColorPicker from "./ColorPicker";

interface IMoonModal{
  moon?: Moon;
  onClose: () => void;
  updateMoon: (moon: Moon | undefined) => void;
}

const MoonModal = (props: IMoonModal) => {
  const [name, setName] = useState(props.moon ? props.moon.name : "Moon Name");
  const [days, setDays] = useState(props.moon ? props.moon.daysToCycle.toString() : 29.531.toFixed(3));
  const [offSet, setOffset] = useState(props.moon ? props.moon.cycleOffset.toString() : 26 + "");
  const [color, setColor] = useState(props.moon ? props.moon.color : "yellow");
  const toolTip = (
    <div>
      <div>The number of days until the first full moon in Year 1 of your calendar.</div>
      <div>Please note that real, exact moon periods require knowing the orbit of</div>
      <div>the body, and the simplified model I use assumes a perfectly round orbit.</div>
      <div>If you tried to model the real world's moon phases you would find</div>
      <div>they're not quite exact over hundreds of years.</div>
    </div>
  );
  function save(){
    const daysToCycle = parseFloat(days);
    const cycleOffset = parseInt(offSet, 10) || 1;
    if (daysToCycle && cycleOffset){
      const newModel: Moon = {
        ...props.moon,
        name,
        daysToCycle,
        color,
        cycleOffset,
      };
      props.updateMoon(newModel);
    }   
    props.onClose(); 
  }
  function deleteMoon() {
    props.updateMoon(undefined);
    props.onClose();
  }
  return (
    <div className="standard-modal-inner sm">
      <h2>{props.moon ? "Edit Moon" : "New Moon"}</h2>
      <div className="input-combo">
        <label htmlFor="new-moon-name">Name</label>
        <input id="new-moon-name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="input-combo">
        <label htmlFor="moon-cycle">Days To Complete A Cycle</label>
        <input id="moon-cycle" type="number" value={days} onChange={(e) => setDays(e.target.value)} />
      </div>
      <div className="input-combo">
        <label htmlFor="moon-offset">
          <span>Offset Days&nbsp;</span>
          <Tooltip placement="left" trigger={"click"} overlay={toolTip}>
            <span><FontAwesomeIcon style={{fontSize: "0.8em"}} icon={faInfoCircle} /></span>
          </Tooltip>
          
        </label>
        <label style={{display: "none"}} htmlFor="moon-offset">Days until first new year in Year 1</label>
        <input id="moon-offset" type="number" value={offSet} onChange={(e) => setOffset(e.target.value)} />
      </div>
      <ColorPicker color={color} onChange={setColor} />
      <div className="month-dialog-buttons">
        <button className="blue-button" onClick={() => save()}>Done</button>
        {
          props.moon && (
            <button className="danger-button" onClick={() => deleteMoon()}>Delete</button>
          )
        }
      </div>
    </div>
  );
};

export default MoonModal;
