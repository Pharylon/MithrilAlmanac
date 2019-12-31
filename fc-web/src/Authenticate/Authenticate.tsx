import React from "react";
import { AuthenticateUser, GetToken } from "../DataClients/CalendarEventDataClient";

const Authenticate = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  if (code) {
    auth();
  }
  async function auth() {
    if (code) {
      const token = await GetToken(code);
      await AuthenticateUser(token);
    }
  }
  return (
    <div style={{ fontSize: 20, marginTop: 20 }}>
      {code || "Unknown code"}
    </div>
  );
};

export default Authenticate;
