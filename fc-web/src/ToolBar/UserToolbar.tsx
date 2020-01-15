import React, { useState } from "react";
import { observer } from "mobx-react";
import UserState from "../State/UserState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const UserToolbar: React.FC = observer(() => {
  const [showLogout, setShowLogout] = useState(false);
  function logOut(){
    UserState.logOut();
    setShowLogout(false);
  }
  const userName = UserState.userModel ? UserState.userModel.userName : "";
  return (
    <div className="user-toolbar tool-child" onMouseLeave={() => setShowLogout(false)}>
      <div onClick={() => setShowLogout(!showLogout)}>
        <FontAwesomeIcon icon={faUser} />
        <span className="user-toolbar-user-name">&nbsp;{userName}</span>
      </div>
      <div style={{display: showLogout ? "" : "none"}} className="logout">
          <div onClick={() => logOut()} className="fake-link">Logout</div>
        </div>
    </div>
  );
});

export default UserToolbar;
