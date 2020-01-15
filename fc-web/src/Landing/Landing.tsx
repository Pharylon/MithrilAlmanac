import React from "react";
import "./Landing.css";
import logo from "../Images/MithrilAlmanacLogo.jpg";
import { observer } from "mobx-react";
import UserState from "../State/UserState";
import CalendarState from "../State/CalendarState";
import { Link } from "react-router-dom";

const Landing: React.FC = observer(() => {
  function getStarted(){
    if (!UserState.userModel){
      UserState.loginModalOpen = true;
    }
    else{
      CalendarState.createCalendarIsOpen = true;
    }    
  }
  return (
    <div className="landing">
      <div className="landing-content">
        <div className="logo">
          <img className="big-logo" src={logo} alt="Mithril Almanac Logo"/>
        </div>
        <div className="intro-text">
          <p>"What did we do last week?"</p>
          <p>It's the eternal question that starts every game. Hopefully someone kept good notes,
            but even if no one did, you can usually remember it all after a few minutes.
          </p>
          <p>
            But inevitably at some point someone asks "How long ago was it that we fought those gnolls?" Or
            "How long did we spend traveling from Furyondy to Celene?"
          </p>
          <p>
            That's where the Mithril Almanac comes in. Our goal is to create an invaluable resource for tracking
            the events in your campaign. Start a new Calendar, and start adding events. Share it with your group.
            Create a calendar for <em>your</em> world. Cool, right?
          </p>
          <p className="fake-link get-started" onClick={() => getStarted()}>So let's get started!</p>
        </div>
      </div>
        <div className="about fake-link">
          <Link to="about">About</Link>
        </div>
    </div>);
});

export default Landing;

