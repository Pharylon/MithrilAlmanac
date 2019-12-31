import React, { useEffect } from "react";
import "./App.css";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route, HashRouter } from "react-router-dom";
import Landing from "./Landing/Landing";
import CalendarView from "./CalendarView";
import ToolBar from "./ToolBar/ToolBar";
import UserState from "./State/UserState";
import { AuthenticateUser } from "./DataClients/CalendarEventDataClient";
import CalendarEditView from "./CalendarEditView/CalendarEditView";

const App: React.FC = observer(() => {
  // useEffect(() => {
  //   function start() {
  //     const myWindow: any = window;
  //     const gapi: any = myWindow.gapi;
  //     gapi.load('auth2', function() {
  //       const auth2 = gapi.auth2.init({
  //         client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
  //         // Scopes to request in addition to 'profile' and 'email'
  //         //scope: 'additional_scope'
  //       });
  //     });
  //   }

  // }, []);
  useEffect(() => {
    const accessToken = UserState.getAccessToken();
    if (accessToken) {
      AuthenticateUser(accessToken);
    }
  }, []);
  return (
    <div className="App" id="app">
      <HashRouter>
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
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
});

export default App;
