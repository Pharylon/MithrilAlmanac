import React from "react";
import "./App.css";
import CalendarView from "./CalendarView";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="content"><CalendarView></CalendarView></div>
    </div>
  );
};

export default App;
