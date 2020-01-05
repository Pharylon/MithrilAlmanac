import { CalendarModel, CheckIfLeapYear, GetDaysBeforeYear } from "./CalendarModel";

export default interface Month {
  days: number;
  name: string;
  position: number;
}


export interface OffSetInfo{
  previousDays: number;
  offSetDays: number;
}

export function GetOffSetInfo(calendar: CalendarModel, monthNumber: number, year: number): OffSetInfo {
  const daysBeforeYear = GetDaysBeforeYear(calendar, year);
  const yearOffSetDays = daysBeforeYear % calendar.daysOfWeek.length;

  const isLeapYear = CheckIfLeapYear(year, calendar);
  const prevMonths = calendar.months.filter(x => x.position < monthNumber);
  const previousDays = prevMonths.reduce((total, currMonth) => {
    if (isLeapYear && calendar.leapYearRules.month === currMonth.position){
      return total + currMonth.days + 1;
    }
    return total + currMonth.days;
  }, 0);
  let offSetDays = yearOffSetDays + previousDays % calendar.daysOfWeek.length;
  if (offSetDays >= 7) {
    offSetDays -= 7;
  }
  return {
    offSetDays : calendar.resetWeekAtMonthStart ? 0 : offSetDays,
    previousDays: previousDays + daysBeforeYear,
  };
}
