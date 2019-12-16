import Month from "./Month";
import CalendarTemplate from "./CalendarTemplate";
import CalendarEvent from "./CalendarEvent";

export default interface CalendarModel extends CalendarTemplate {
  id: string;
  currentYear: number;
  events: CalendarEvent[];
}
