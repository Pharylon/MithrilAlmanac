import Month from "./Month";

export interface CalendarTemplate {
  months: Month[];
  daysOfWeek: string[];
}

export interface CalendarModel extends CalendarTemplate {
  id: string;
  currentYear: number;
}
