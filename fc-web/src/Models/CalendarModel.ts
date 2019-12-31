import Month from "./Month";

interface LeapYearRules{
  interval: number;
  unlessDivisions: number[];
  month: number;
}

interface Holiday{
  name: string;
  date: {month: number; dayOfMonth: number};
}

export interface CalendarTemplate {
  months: Month[];
  daysOfWeek: string[];
  leapYearRules: LeapYearRules;
  currentYear: number;
  resetWeekAtMonthStart: boolean;
  holidays: Holiday[];
}


export interface CalendarModel extends CalendarTemplate {
  id: string;
  name: string;
  shareId: string;
}

export const blankModel: CalendarModel = {
  name: "",
  id: "__BLANK__",
  currentYear: -1,
  months: [],
  daysOfWeek: [],
  leapYearRules: {
    month: 0,
    interval: 0,
    unlessDivisions: [],
  },
  resetWeekAtMonthStart: false,
  holidays: [],
  shareId: "",
};


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
