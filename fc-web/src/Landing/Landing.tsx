import React from "react";
import "./Landing.css";
import logo from "../Images/MithrilAlmanacLogo.jpg";
import { observer } from "mobx-react";
import UserState from "../State/UserState";

const Landing: React.FC = observer(() => {
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
            "How long did we spending traveling from Furyondy to Celene?"
          </p>
          <p>
            That's where the Mithril Almanac comes in. Our goal is to create a resource where you can log your
            campaign adventures. Record what happened when, search those records, and sort them, either by your game 
            calendar or the real life calendar. Pretty cool, right? We think so to! 
          </p>
          <p className="fake-link get-started" onClick={() => UserState.loginModalOpen = true}>So let's get started!</p>
        </div>
      </div>
    </div>);
});

export default Landing;

