import React, { useEffect } from "react";
import "./App.css";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import CalendarView from "./CalendarView";
import ToolBar from "./ToolBar/ToolBar";
import UserState from "./State/UserState";
import CalendarEditView from "./CalendarEditView/CalendarEditView";
import Authenticate from "./Authenticate/Authenticate";

const App: React.FC = observer(() => {
  useEffect(() => {
    const accessToken = UserState.getAccessToken();
    if (accessToken) {
      UserState.authenticateUser(accessToken);
    }
  }, []);
  return (
    <div className="App" id="app">
      <Router>
        <ToolBar />
        <Switch>
          <Route path="/calendar/:calendarId/edit">
            <CalendarEditView />
          </Route>
          <Route path="/calendar/:calendarId/:year">
            <CalendarView />
          </Route>
          <Route path="/calendar/:calendarId/">
            <CalendarView />
          </Route>
          <Route path="/authenticate">
            <Authenticate />
          </Route>
          <Route path="/">
            <Landing />
          </Route>  
        </Switch>
      </Router>
    </div>
  );
});

export default App;
