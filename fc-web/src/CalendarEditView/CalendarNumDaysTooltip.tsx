import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";


const CalendarNumDays = (props: {totalDaysInYear: number}) => {
  const [showToolTip, setShowTooltip] = useState(false);
  return (
    <div>
      <span>Days In Year:&nbsp;</span>
      <span>{props.totalDaysInYear}&nbsp;</span>
      <span>
        <FontAwesomeIcon
          onMouseOver={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowTooltip(!showToolTip)}
          className="day-number-info-icon" icon={faInfoCircle} />
        <div style={{display: showToolTip ? "" : "none"}} className="calendar-num-days-tooltip">
          <span>To change this number, alter the number of days in individual months</span>
        </div>
      </span>
    </div>
  );
};

export default CalendarNumDays;
