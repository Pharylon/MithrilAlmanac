import React, { useEffect, useState } from "react";
import "./App.css";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./Landing/Landing";
import ToolBar from "./ToolBar/ToolBar";
import UserState from "./State/UserState";
import CalendarEditView from "./CalendarEditView/CalendarEditView";
import Authenticate from "./Authenticate/Authenticate";
import Modal from "react-modal";
import ErrorState from "./State/ErrorState";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import CalendarViewWrapper from "./CalendarView/CalendarViewWrapper";
import "./Tooltip.css";
import About from "./About";

const App: React.FC = observer(() => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const myApp = document.getElementById("app");
    if (myApp) {
      Modal.setAppElement(myApp);
      setLoaded(true);
    }
  }, []);

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
            <CalendarViewWrapper />
          </Route>
          <Route path="/calendar/:calendarId/">
            <CalendarViewWrapper />
          </Route>
          <Route path="/authenticate">
            <Authenticate />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
      {
        loaded && (
          <Modal
            className="error-modal"
            isOpen={!!ErrorState.errorMessage}
            onRequestClose={() => ErrorState.errorMessage = ""}>
            <div className="error-modal">
              <div className="error-title">
                <FontAwesomeIcon icon={faExclamationTriangle} />
                <div>Uh-oh</div>
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </div>
              <div className="error-message">{ErrorState.errorMessage}</div>
            </div>
          </Modal>
        )
      }
    </div>
  );
});

export default App;
