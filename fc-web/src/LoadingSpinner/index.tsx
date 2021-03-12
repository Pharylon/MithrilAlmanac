import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="spin-wrapper">
      <div className="spin-inner"><FontAwesomeIcon icon={faCog} spin={true} size="10x" /></div>
    </div>
  );
};

export default LoadingSpinner;
