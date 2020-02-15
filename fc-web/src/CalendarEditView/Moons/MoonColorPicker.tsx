import React, { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";

const MoonColorPicker = (props: {color: string, onChange: (color: string) => void}) => {
  const node = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  function handleClick(e: any){
    if (node && node.current && e.target && !node.current.contains(e.target)) {
      setShowColorPicker(false);
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
    <label htmlFor="moon-color">Display Color</label>
    <div className="moon-color-example" onClick={() => setShowColorPicker(!showColorPicker)}>
      <div style={{backgroundColor: props.color || ""}}>&nbsp;</div>
    </div>
    {
      showColorPicker && (
        <div className="color-picker-wrapper">
            <div><SketchPicker color={props.color}  onChange={(e) => props.onChange(e.hex)} /></div>
          </div>
      )
    }
  </div>
    
  );
};

export default MoonColorPicker;
