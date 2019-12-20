import React, { useEffect } from "react";
import "./App.css";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import CalendarView from "./CalendarView";
import ToolBar from "./ToolBar/ToolBar";
import UserState from "./State/UserState";
import { AuthenticateUser } from "./DataClients/CalendarEventDataClient";

const App: React.FC = observer(() => {
  useEffect(() => {
    const accessToken = UserState.getAccessToken();
    if (accessToken){
      AuthenticateUser(accessToken);
    }
  }, []);
  return (
    <div className="App" id="app">
      <Router>
        <ToolBar/>
        <Switch>
        <Route path="/calendar/:calendarId">
            <CalendarView />
          </Route>
          <Route path="/">
            <Landing/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
});

export default App;
