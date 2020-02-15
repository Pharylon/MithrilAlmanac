import React, { useState } from "react";
import { observer } from "mobx-react";
import ColorPicker from "./CalendarColorPicker";
import "./CalendarColors.css";
import EditCalendarState from "../../State/EditCalendarState";

const DefaultColor: React.FC = observer(() => {
  const [color, setColor] = useState(EditCalendarState.calendar.colorOptions.defaultMonthColor);
  function setCalendarColor(newColor: string){
    setColor(newColor);
    const months = document.querySelectorAll(".month");
    console.log("Months", months);
    if (months){
      months.forEach(m => {
        const month = m as HTMLDivElement;
        if (!month.classList.contains("no-events")){
          month.style.background = newColor;
        }        
      });
    }
  }
  function onClose(){
    EditCalendarState.calendar.colorOptions.defaultMonthColor = color;
  }
  return (
    <div className="calendar-color-line">
        <ColorPicker onClose={onClose} title="Default Calendar Color" color={color} onChange={setCalendarColor} />
      </div>
  );
});

export default DefaultColor;
