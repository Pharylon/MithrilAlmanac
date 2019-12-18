import React from "react";
import "./App.css";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Landing from "./Landing/Landing";
import CalendarView from "./CalendarView";
import ColoredSquares from "./Images/ColoredSquares.png";
import ToolBar from "./ToolBar";

const App: React.FC = observer(() => {
  return (
    <div className="App" id="app">
      <ToolBar/>
      <Router>
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
