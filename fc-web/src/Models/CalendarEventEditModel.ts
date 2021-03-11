import CalendarEvent from "./CalendarEvent";

export default interface CalendarEventEditModel {
  calendarEvent: CalendarEvent;
  makeCurrentDate: boolean;
}