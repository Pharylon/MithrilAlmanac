import CalendarEvent from "../../Models/CalendarEvent";

export interface MonthEvents {
  month: number;
  events: CalendarEvent[];
  isMonthEvent: true;
}

export interface EventFiller {
  months: string[];
  days: number;
  isMonthEvent: false;
}

type CondensedElement = EventFiller | MonthEvents;

export default CondensedElement;
