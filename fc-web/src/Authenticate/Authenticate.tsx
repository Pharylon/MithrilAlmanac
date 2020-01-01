import React from "react";
import { GetToken } from "../DataClients/AuthenticationDataClient";
import UserState from "../State/UserState";
import { observer } from "mobx-react";
import { Redirect } from "react-router-dom";

const Authenticate = observer(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (UserState.userName){
    return <Redirect to="/" />;
  }
  if (code) {
    auth();
  }
  async function auth() {
    if (code) {
      const token = await GetToken(code);
      await UserState.authenticateUser(token);
    }
  }
  return (
    <div style={{ fontSize: 20, marginTop: 20 }}>
      Please wait while we log you in...
    </div>
  );
});

export default Authenticate;
