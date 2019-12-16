import Month from "./Month";

export interface CalendarTemplate {
  months: Month[];
  weekLength: number;
}

export interface CalendarModel extends CalendarTemplate {
  id: string;
  currentYear: number;
}
