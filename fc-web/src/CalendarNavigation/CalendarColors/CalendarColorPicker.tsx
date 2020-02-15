import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";

interface ICalendarColorPicker {
  color: string;
  onChange: (color: string) => void;
  title: string;
  onClose: () => void;
}

const CalendarColorPicker = (props: ICalendarColorPicker) => {
  const node = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  function handleClick(e: any) {
    if (node && node.current && e.target && !node.current.contains(e.target)) {
      setShowColorPicker(false);
      props.onClose();
    }
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClick);  // return function to be called when unmounted
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);
  return (
    <div ref={node} className="input-combo">
      <div className="calendar-color-title">
        <div><label htmlFor="moon-color">{props.title}</label></div>
        <div><FontAwesomeIcon onClick={() => props.onChange("")} icon={faWindowClose} /></div>
      </div>
      <div className="moon-color-example" onClick={() => setShowColorPicker(!showColorPicker)}>
        <div style={{ backgroundColor: props.color || "" }}>&nbsp;</div>
      </div>
      {
        showColorPicker && (
          <div className="color-picker-wrapper">
            <div><SketchPicker color={props.color} onChange={(e) => props.onChange(e.hex)} /></div>
          </div>
        )
      }
    </div>

  );
};

export default CalendarColorPicker;
