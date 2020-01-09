import React, { useState } from "react";
import { observer } from "mobx-react";
import EditCalendarState from "../State/EditCalendarState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import Tooltip from "rc-tooltip";

const LeapYearEdit: React.FC = observer(() => {
  const rules = EditCalendarState.calendar.leapYearRules;
  const [editMode, setEditMode] = useState(false);
  const [interval, setInterval] = useState("");
  const [month, setMonth] = useState(rules.month);
  const [unless, setUnless] = useState("");
  const toolTip = (
    <div>
      <div>If the year is divisible by the first number, then it is not a leap year</div>
      <div>But it will be a leap year if it is divisible by the second number,</div>
      <div>but again not a leap year if divisible by the third, and so on.</div>
      <div>These numbers should be separated by a dash</div>
      <div>For the real word, the leap year rules would be "100-400"</div>
      <div>Because we have leap years every 4 years, unless that year is divisible by 100</div>
      <div>but always if it is divisible by 400.</div>
    </div>
  );
  function getLeapYearMonthName(){
    const monthModel = EditCalendarState.calendar.months.find(x => x.position === rules.month);
    if (monthModel){
      return monthModel.name;
    }
    return "N/A";
  }
  function enableEdit(){
    setEditMode(true);
    setInterval(rules.interval.toString());
    setUnless(rules.unlessDivisions.join("-"));
    setMonth(rules.month);
  }
  function endEdit(){
    function getUnlessYears(){
      const newUnless = unless.split("-");
      if (newUnless && newUnless.length > 0){
        const newUnlessInt = newUnless.map(x => parseInt(x, 10));
        if (!newUnlessInt.some(x => !x)){
          return newUnlessInt;
        }        
      }
      return undefined;
    }
    const newInterval = parseInt(interval, 10);
    if (newInterval){
      EditCalendarState.calendar.leapYearRules.interval = newInterval;
    }
    else{
      EditCalendarState.calendar.leapYearRules.interval = 0;
    }
    const unlessYears = getUnlessYears();
    if (unlessYears){
      EditCalendarState.calendar.leapYearRules.unlessDivisions = unlessYears;
    }
    else{
      EditCalendarState.calendar.leapYearRules.unlessDivisions = [];
    }
    if (month){
      EditCalendarState.calendar.leapYearRules.month = month;
    }
    setEditMode(false);
  }
  return (
    <div>
      <h3 className="edit-title">
        <div className="leap-year-edit">
          <div>Leap Years</div>
          <div><FontAwesomeIcon icon={faEdit} onClick={() => enableEdit()} /></div>
        </div>
      </h3>
      <div className="gray-box">
        {
          !editMode && (
            <div>
              <div>{`A day is added to ${getLeapYearMonthName()} every ${rules.interval} years`}</div>
              <ul>
                {
                  rules.unlessDivisions.map((x, i) =>
                    (<li key={i}>{`${(i % 2 === 0 ? "But not if" : "But is if")} the year is divisible by ${x}`}</li>))
                }
              </ul>
            </div>
          )
        }
        {
          editMode && (
            <div>
              <div className="input-combo">
                <label htmlFor="lyi">Leap Year Interval</label>
                <input type="number" id="lyi" value={interval} onChange={(e) => setInterval(e.target.value)} />
              </div>
              <div className="input-combo">
                <label htmlFor="lym">Leap Year Interval</label>
                <select value={month} onChange={(e) => setMonth(parseInt(e.target.value, 10))}>
                {
                  EditCalendarState.calendar.months.map((m) => (
                    <option key={m.position} value={m.position}>{m.name}</option>
                  ))
                }
                </select>
              </div>
              <div className="input-combo">
                <div className="leap-year-edit">
                  <div><label htmlFor="unless">Unless Years</label></div>
                  <div>
                    <Tooltip placement="left" trigger={"click"} overlay={toolTip}>
                      <FontAwesomeIcon style={{ fontSize: "0.8em" }} icon={faInfoCircle} />
                    </Tooltip>
                  </div>
                </div>
                <input type="text" id="unless" value={unless} onChange={(e) => setUnless(e.target.value)} />
              </div>
              <button onClick={endEdit} className="blue-button">Done</button>
            </div>
          )
        }
      </div>
    </div>
  );
});

export default LeapYearEdit;
