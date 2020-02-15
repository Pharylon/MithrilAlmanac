import React, { useState } from "react";
import { observer } from "mobx-react";
import EditState from "../../State/EditCalendarState";
import ColorPicker from "./CalendarColorPicker";
import "./CalendarColors.css";
import DefaultColor from "./DefaultColor";

const CalendarColor: React.FC = observer(() => {
  return (
    <div>
      <h3>Calendar Colors</h3>
      <DefaultColor />
    </div>
  );
});

export default CalendarColor;
