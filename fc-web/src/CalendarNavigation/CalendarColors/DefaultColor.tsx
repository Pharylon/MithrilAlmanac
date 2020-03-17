import React, { useState } from "react";
import { observer } from "mobx-react";
import ColorPicker from "./CalendarColorPicker";
import "./CalendarColors.css";
import CalendarColorState from "./CalendarColorState";

const DefaultColor: React.FC = observer(() => {
  const [color, setColor] = useState(CalendarColorState.calendar.colorOptions.defaultMonthColor);
  function setCalendarColor(newColor: string) {
    console.log("NEW", newColor);
    setColor(newColor);
    const months = document.querySelectorAll(".month");
    console.log("Months", months);
    if (months) {
      months.forEach(m => {
        const month = m as HTMLDivElement;
        if (!month.classList.contains("no-events")) {
          month.style.background = newColor;
        }
      });
    }
  }
  function onClose() {
    CalendarColorState.calendar.colorOptions.defaultMonthColor = color;

  }
  return (
    <div className="calendar-color-line">
      <ColorPicker onClose={onClose} title="Default Month Background" color={color} onChange={setCalendarColor} />
    </div>
  );
});

export default DefaultColor;
