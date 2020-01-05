import Month from "./Month";
import { Holiday } from "./FantasyDate";
import Moon from "./Moon";

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
  resetWeekAtMonthStart: boolean;
  holidays: Holiday[];
  moons: Moon[];
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
  moons: [],
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

export function GetDaysBeforeYear(calendar: CalendarModel, year: number){
  const prevYears = year > 0 ? Array.from(Array(year).keys()) : [0];
  const totalDaysInYear = calendar.months.reduce((total, currMonth) => {
    return total + currMonth.days;
  }, 0);
  const daysBeforeYear = prevYears.reduce((totalDays, yearNum) => {
    const isLeapYear = CheckIfLeapYear(yearNum, calendar);
    return totalDays + totalDaysInYear + (isLeapYear ? 1 : 0);
  }, 0);
  return daysBeforeYear;
}
