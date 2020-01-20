import React, { useEffect } from "react";
import { observer } from "mobx-react";
import ColoredSquares from "../Images/ColoredSquares.png";
import Modal from "react-modal";
import GoogleButton from "../SignIn/GoogleButton";
import UserState from "../State/UserState";
import "./ToolBar.css";
import CalendarDd from "./CalendarDD";
import { Link } from "react-router-dom";
import UserToolbar from "./UserToolbar";
import About from "./AboutToolbarLink";

const ToolBar: React.FC = observer(() => {
  useEffect(() => Modal.setAppElement("#app"), []);

  return (
    <div className="top-bar">
      <Link to="/home"><div><img className="small-logo" src={ColoredSquares} alt="small logo" /></div></Link>
      {/* <div className="title">The Mithril Almanac</div> */}
      {
        UserState.userModel ?
          (<div className="right-toolbar">
            <CalendarDd />                       
            <UserToolbar />
            <About />
          </div>) :
          (<div className="right-toolbar">
            <About />
            <div className="fake-link tool-child" onClick={() => UserState.loginModalOpen = true}>Log In</div>
          </div>)
      }
      <Modal
        className="modal-wrapper"
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
