import Month, { GetDaysInMonth } from "./Month";
import FantasyDate, { Holiday } from "./FantasyDate";
import Moon from "./Moon";
import { ViewType } from "./CalendarViewType";
import ICalendarColorOptions, { defaultColorOptions } from "./CalendarColorOptions";

interface LeapYearRules{
  interval: number;
  unlessDivisions: number[];
  month: number;
}

export interface CalendarTemplate {
  months: Month[];
  daysOfWeek: string[];
  leapYearRules: LeapYearRules;
  currentDate: FantasyDate;
  resetWeekAtMonthStart: boolean;
  holidays: Holiday[];
  moons: Moon[];
  offSetDays: number;
}


export interface CalendarModel extends CalendarTemplate {
  id: string;
  name: string;
  shareId: string;
  defaultView: ViewType;
  colorOptions: ICalendarColorOptions;
}

export const blankModel: CalendarModel = {
  name: "",
  id: "__BLANK__",
  currentDate: {dayOfMonth: 0, year: 0, month: 0},
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
  offSetDays: 0,
  defaultView: ViewType.Calendar,
  colorOptions: defaultColorOptions,
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
  const offset = calendar.offSetDays || 0;
  const prevYears = year > 1 ? Array.from(Array(year - 1).keys()).map(x => x + 1) : [];
  const totalDaysInYear = calendar.months.reduce((total, currMonth) => {
    return total + currMonth.days;
  }, 0);
  const daysBeforeYear = offset + prevYears.reduce((totalDays, yearNum) => {
    const isLeapYear = CheckIfLeapYear(yearNum, calendar);
    return totalDays + totalDaysInYear + (isLeapYear ? 1 : 0);
  }, 0);
  return daysBeforeYear;
}

function sortDates(dates: FantasyDate[]){
  const newArray = [...dates];
  newArray.sort((a, b) => {
    if (a.year !== b.year) {
      return a.year - b.year;
    }
    else if (a.month !== b.month) {
      return a.month - b.month;
    }
    else {
      return a.dayOfMonth - b.dayOfMonth;
    }
  });
  return newArray;
}

function getDaysInYearAfterDate(date: FantasyDate, calendar: CalendarModel){
  const lastMonth = calendar.months.reduce((prev, curr) => curr.position > prev.position ? curr : prev);
  const lastDayOfTheYear: FantasyDate = {
    year: date.year,
    month: lastMonth.position,
    dayOfMonth: lastMonth.days,
  };
  const daysRemainingNoLeap = GetDaysBetweenDates(calendar, date, lastDayOfTheYear);
  if (CheckIfLeapYear(date.year, calendar)){
    if (calendar.leapYearRules.month < date.month){
      return daysRemainingNoLeap + 1; 
    }
    else if (calendar.leapYearRules.month === date.month){
      const leapMonth = calendar.months.find(x => x.position === calendar.leapYearRules.month) as Month;
      if (date.dayOfMonth <= leapMonth.days){
        return daysRemainingNoLeap + 1;
      }
    }
  }
  return daysRemainingNoLeap;
}

function getDaysInYearBeforeDate(date: FantasyDate, calendar: CalendarModel){
  const firstDayOfTheYear: FantasyDate = {
    year: date.year,
    month: 1,
    dayOfMonth: 1,
  };
  const daysRemainingNoLeap = GetDaysBetweenDates(calendar, date, firstDayOfTheYear);
  if (calendar.leapYearRules.month < date.month && CheckIfLeapYear(date.year, calendar)){
    return daysRemainingNoLeap + 1;
  }
  return daysRemainingNoLeap;
}

export function GetDaysBetweenDates(calendar: CalendarModel, d1: FantasyDate, d2: FantasyDate): number{
  const [firstDate, secondDate] = sortDates([d1, d2]);
  if (firstDate.year === secondDate.year && firstDate.month === secondDate.month){
    return secondDate.dayOfMonth - firstDate.dayOfMonth;
  }
  else if (firstDate.year === secondDate.year) {
    const firstMonth = calendar.months.find(x => x.position === firstDate.month);
    if (!firstMonth){
      console.log("Couldn't find month for a date. Something went wrong!", calendar, d1, d2);
      return 0;
    }
    const remainingDaysInMonth = firstMonth.days - firstDate.dayOfMonth + 1;
    const daysInMonthsBetween = calendar.months
      .filter(x => x.position < secondDate.month && x.position > firstDate.month)
      .reduce((prev, curr) => {
        const daysInMonth = GetDaysInMonth(calendar, curr.position, firstDate.year);
        return prev + daysInMonth;
      }, 0);
    const total = remainingDaysInMonth + daysInMonthsBetween + secondDate.dayOfMonth - 1;
    return total;
  }
  else{
    let totalDays = 0;
    totalDays += getDaysInYearAfterDate(firstDate, calendar);
    totalDays += getDaysInYearBeforeDate(secondDate, calendar);
    const totalDaysInYear = calendar.months.reduce((total, currMonth) => {
      return total + currMonth.days;
    }, 0);
    for (let year = firstDate.year + 1; year < secondDate.year; year++){
      totalDays += totalDaysInYear;
      if (CheckIfLeapYear(year, calendar)){
        totalDays += 1;
      }
    }
    return totalDays;
  }
}
