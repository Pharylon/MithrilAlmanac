import React, { useEffect, useState } from "react";
import "./App.css";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
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
import { getInternetExplorerVersion } from "./Utility";
import UpdateBanner from "./Updates/UpdateBanner";
import { ViewType } from "./CalendarView/CalendarViewType";

const App: React.FC = observer(() => {
  const [loaded, setLoaded] = useState(false);
  const [calendarRedirect, setCalendarRedirect] = useState("");

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

  useEffect(() => {
    const lastCalendar = localStorage.getItem("LastCalendar");
    if (lastCalendar){
      setCalendarRedirect(lastCalendar);
    }
  }, []);

  useEffect(() => {
    if (navigator.userAgent.match(/SamsungBrowser/i)){
      alert("The Samsung Internet browser does not work with this site. " +
      "Supported browsers are Firefox, Chrome, Edge, and Safari. Sorry!");
    }
    else if (getInternetExplorerVersion() > 0){
      alert("Internet Explorer does not work with this site. " +
      "Supported browsers are Firefox, Chrome, Edge, and Safari. Sorry!!");
    }
  }, []);

  function getDefaultReturn(){
    if (calendarRedirect){
      return <Redirect to={"/calendar/" + calendarRedirect} />;
    }
    else{
      return <Landing/>;
    }
  }


  return (
    <div className="App" id="app">
      <Router>
        <ToolBar />
        <Switch>
          <Route path="/edit/:calendarId">
            <CalendarEditView />
          </Route>
          <Route path="/calendar/:calendarId/:year">
            <CalendarViewWrapper viewType={ViewType.Calendar} />
          </Route>
          <Route path="/calendar/:calendarId/">
            <CalendarViewWrapper viewType={ViewType.Calendar} />
          </Route>
          <Route path="/timeline/:calendarId/">
            <CalendarViewWrapper viewType={ViewType.Timeline} />
          </Route>
          <Route path="/authenticate">
            <Authenticate />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/home">
            <Landing/>
          </Route>
          <Route path="/">
            {getDefaultReturn()}
          </Route>
        </Switch>
      </Router>
      {
        loaded && (
          <Modal
            className="modal-wrapper"
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
      <UpdateBanner/>
    </div>
  );
});

export default App;
