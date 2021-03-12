import React from "react";
import MonthView from "./MonthView";
import { observer } from "mobx-react";
import CalendarState from "../State/CalendarState";
import Modal from "react-modal";
import DayDetailView from "../DayDetail/DayDetailView";
import { useParams } from "react-router-dom";
import CalendarToolbar from "../CalendarNavigation/CalendarToolBar";
import TimeLineView from "./TimelineView/TimelineView";
import JoinCalendarHelper from "../CalenderJoinHelper";
import EditEvent from "../DayDetail/EditEvent";
import "./CalendarView.css";
import { ViewType } from "../Models/CalendarViewType";
import CondensedView from "./CondensedView/CondensedView";


const CalendarView = observer((props: { viewType: ViewType }) => {
  const { year } = useParams<{year: string}>();
  function getYear(): number {
    if (!year) {
      return CalendarState.calendar.currentDate.year;
    }
    return parseInt(year, 10);
  }
  function onModalClose() {
    CalendarState.selectedDay = undefined;
    CalendarState.calendarEditEvent = undefined;
  }
  const currentYear = getYear();
  JoinCalendarHelper(CalendarState.calendar.id);
  return (
    <div className="calendar" id="calendar">
      <CalendarToolbar year={currentYear} viewType={props.viewType} />
      <div className="calendar-body">
        {
          CalendarState.calendar.moons.length > 1 && (
            <div className="moon-key">
              {
                CalendarState.calendar.moons.map((moon, i) => (
                  <div key={i} className="moon-key-item">
                    <div style={{ backgroundColor: moon.color }} className="full-moon" ></div>
                    <div>{moon.name}</div>
                  </div>
                  ))
              }
            </div>
          )
        }
        {
          (() => {
            switch (props.viewType) {
              case ViewType.Timeline: return (<TimeLineView />);
              case ViewType.Condensed: return (<CondensedView/>);
              case ViewType.Calendar: return (<div className="calendar-months">
                {
                  CalendarState.calendar.months.map((x) =>
                    <MonthView
                      year={currentYear}
                      key={x.position}
                      monthNumber={x.position} />,
                  )
                }
              </div>);
            }
          })()
        }
      </div>
      <Modal
        className="modal-wrapper"
        isOpen={!!CalendarState.selectedDay || !!CalendarState.calendarEditEvent}
        onRequestClose={() => onModalClose()}>
        <div>
          {
            CalendarState.selectedDay && !CalendarState.calendarEditEvent &&
            (
              <DayDetailView date={CalendarState.selectedDay} />
            )
          }
          {
            CalendarState.calendarEditEvent && (
              <EditEvent />
            )
          }
        </div>
      </Modal>
    </div>
  );
});

export default CalendarView;
