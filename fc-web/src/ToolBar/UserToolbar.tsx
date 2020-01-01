import React, { useState } from "react";
import { observer } from "mobx-react";
import UserState from "../State/UserState";

const UserToolbar: React.FC = observer(() => {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <div className="user-toolbar" onMouseLeave={() => setShowLogout(false)}>
      <div onClick={() => setShowLogout(!showLogout)}>{UserState.userName}</div>
      <div style={{display: showLogout ? "" : "none"}} className="logout">
          <div onClick={() => UserState.logOut()} className="fake-link">Logout</div>
        </div>
    </div>
  );
});

export default UserToolbar;
