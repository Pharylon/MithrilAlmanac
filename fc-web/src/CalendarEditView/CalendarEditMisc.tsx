import React from "react";
import { observer } from "mobx-react";
import EditCalendarState from "../State/EditCalendarState";
import Tooltip from "rc-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const EditMisc: React.FC = observer(() => {
  // const [editMode, setEditMode] = useState(false);
  const toolTip = (
    <div>
      <div>The number of days to offset the first day of Year 1.</div>
      <div>For instance, in the real world, the Gregorian calendar began</div>
      <div>on a Monday instead of a Sunday, so you would enter a 1 here.</div>
    </div>
  );
  function updateOffset(newVal: string) {
    const newOffset = parseInt(newVal, 10);
    if (newOffset || newOffset === 0) {
      EditCalendarState.calendar.offSetDays = newOffset;
    }
  }
  return (
    <div className="holidays">
      <h3 className="edit-title">Miscellaneous</h3>
      <div className="gray-box">
      <div className="input-combo">
              <label htmlFor="offset">
                <span>Offset Days</span>
                <Tooltip placement="left" trigger={"click"} overlay={toolTip}>
                  <span><FontAwesomeIcon style={{ fontSize: "0.8em", marginLeft: 10 }} icon={faInfoCircle} /></span>
                </Tooltip>
              </label>
              <input className="input-standard"
                type="number"
                min="0"
                step="1"
                value={EditCalendarState.calendar.offSetDays || 0}
                onChange={(e) => updateOffset(e.target.value)} />
            </div>
        {/* {
          editMode ? (
            <div className="input-combo">
              <label htmlFor="offset">
                <span>Offset Days</span>
                <Tooltip placement="left" trigger={"click"} overlay={toolTip}>
                  <FontAwesomeIcon style={{ fontSize: "0.8em", marginLeft: 10 }} icon={faInfoCircle} />
                </Tooltip>
              </label>
              <input
                type="number"
                value={EditCalendarState.calendar.offSetDays}
                onChange={(e) => updateOffset(e.target.value)} />
            </div>
          ) :
            (
              <div>                
                <span >First week offset by {offSet} days</span>
                <FontAwesomeIcon style={{marginLeft: 10}} icon={faEdit} onClick={() => setEditMode(true)} />
              </div>
            )
        } */}
      </div>
    </div>
  );
});

export default EditMisc;
