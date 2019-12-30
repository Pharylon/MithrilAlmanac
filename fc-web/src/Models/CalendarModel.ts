import Month from "./Month";

interface LeapYearRules{
  interval: number;
  unlessDivisions: number[];
  month: number;
}

export interface CalendarTemplate {
  months: Month[];
  daysOfWeek: string[];
  leapYearRules: LeapYearRules;
  currentYear: number;
}


export interface CalendarModel extends CalendarTemplate {
  userId: string;
  id: string;
  name: string;
}

export function CheckIfLeapYear(year: number, calendar: CalendarModel): boolean{
  if (year === 0){
    return false;
  }
  let isLeapYear = year % calendar.leapYearRules.interval === 0;
  for (const divisionRule of calendar.leapYearRules.unlessDivisions){
    if (year % divisionRule === 0){
      isLeapYear = !isLeapYear;
    }
  }
  return isLeapYear;
}
