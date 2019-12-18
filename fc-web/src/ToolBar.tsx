import React, { useState, useEffect } from "react";
import "./App.css";
import { observer } from "mobx-react";
import ColoredSquares from "./Images/ColoredSquares.png";
import Modal from "react-modal";
import GoogleButton from "./GoogleButton";
import UserState from "./State/UserState";

const ToolBar: React.FC = observer(() => {
  useEffect(() => Modal.setAppElement("#app"), []);

  return (
    <div className="App" id="app">
      <div className="top-bar">
        <img src={ColoredSquares} alt="small logo" />
        {/* <div className="title">The Mithril Almanac</div> */}
        <div className="fake-link" onClick={() => UserState.loginModalOpen = true}>Log In</div>
      </div>
      <Modal
        className="event-modal"
        isOpen={UserState.loginModalOpen}
        onRequestClose={() => UserState.loginModalOpen = false}>
        <div className="login-modal">
          <div className="sign-in-text">Sign in with Google</div>
          <GoogleButton/>
        </div>
      </Modal>
    </div>
  );
});

export default ToolBar;
