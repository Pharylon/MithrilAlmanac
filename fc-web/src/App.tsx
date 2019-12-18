import React, { useEffect } from "react";
import "./App.css";
import CalendarView from "./CalendarView";
import { observer } from "mobx-react";
import CalendarState from "./State/CalendarState";
import { GoogleLogin } from "react-google-login";

const App: React.FC = observer(() => {
  if (CalendarState.calendar.id === "__BLANK__"){
    return (
      <div>Loading...</div>
    );
  }
  const responseGoogle = (response: any) => {
    console.log(response);
  }
  
  return (
    <div className="App" id="app">
      <GoogleLogin
        clientId="214138073904-0hrvbipnivru968l2pr099dl3hf197iu.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
  />,
      {/* <div className="content"><CalendarView/></div> */}
    </div>
  );
});

export default App;
