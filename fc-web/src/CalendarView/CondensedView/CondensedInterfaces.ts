import CalendarEvent from "../../Models/CalendarEvent";
import Month from "../../Models/Month";

export interface MonthEvents {
  month: number;
  events: CalendarEvent[];
  isMonthEvent: true;
}

export interface EventMonthFiller {
  months: Month[];
  days: number;
  isMonthEvent: false;
}

type CondensedElement = EventMonthFiller | MonthEvents;

export default CondensedElement;
