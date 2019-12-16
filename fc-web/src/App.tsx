import React from "react";
import "./App.css";
import CalendarView from "./CalendarView";
import { observer } from "mobx-react";
import CalendarState from "./State/CalendarState";

const App: React.FC = observer(() => {
  if (CalendarState.calendar.id === "__BLANK__"){
    return (
      <div>Loading...</div>
    );
  }
  return (
    <div className="App" id="app">
      <div className="content"><CalendarView/></div>
    </div>
  );
});

export default App;
