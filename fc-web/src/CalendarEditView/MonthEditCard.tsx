import React, { useState } from "react";
import Month from "../Models/Month";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const MonthEditCard = (props: { month: Month }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <div>
      <div>
        <span>{props.month.name}&nbsp;</span>
        <FontAwesomeIcon
          onClick={() => setEditMode(true)}
          className="month-edit-icon" icon={faEdit} />
      </div>
      {
        editMode ?
          (<div className="num-days-in-month">
            <span>Days&nbsp;</span>
            <span>{props.month.days}</span>
          </div>) :
          (<div className="num-days-in-month">
            <span>Days&nbsp;</span>
            <span>{props.month.days}</span>
          </div>)
      }
    </div>
  );
};

export default MonthEditCard;
