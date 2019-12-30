import React, { useEffect } from "react";
import { observer } from "mobx-react";
import ColoredSquares from "../Images/ColoredSquares.png";
import Modal from "react-modal";
import GoogleButton from "../GoogleButton";
import UserState from "../State/UserState";
import "./ToolBar.css";
import CalendarDd from "./CalendarDD";

const ToolBar: React.FC = observer(() => {
  useEffect(() => Modal.setAppElement("#app"), []);

  return (
    <div className="top-bar">
      <div><img src={ColoredSquares} alt="small logo" /></div>
      {/* <div className="title">The Mithril Almanac</div> */}
      {
        UserState.userName ?
          (<div className="right-toolbar">
            <CalendarDd />
            <div>{UserState.userName}</div>
          </div>) :
          (<div className="fake-link" onClick={() => UserState.loginModalOpen = true}>Log In</div>)
      }
      <Modal
        className="event-modal"
        isOpen={UserState.loginModalOpen}
        onRequestClose={() => UserState.loginModalOpen = false}>
        <div className="login-modal">
          <div className="sign-in-text">Sign in with Google</div>
          <GoogleButton />
        </div>
      </Modal>
    </div>
  );
});

export default ToolBar;