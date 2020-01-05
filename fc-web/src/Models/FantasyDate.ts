import { CalendarModel } from "./CalendarModel";

export interface RecurringDate {
  month: number;
  dayOfMonth: number;
}

export default interface FantasyDate extends RecurringDate {
  year: number;
}

export interface Holiday {
  name: string;
  date: RecurringDate;
}

export function datesAreEqual(date1: FantasyDate, date2: FantasyDate) {
  return (date1.dayOfMonth === date2.dayOfMonth) &&
    (date1.month === date2.month) &&
    (date1.year === date2.year);
}

export function recurringDatesAreEqual(date1: RecurringDate, date2: RecurringDate) {
  return (date1.dayOfMonth === date2.dayOfMonth) &&
    (date1.month === date2.month);
}

export function getDateString(date: RecurringDate, calendar: CalendarModel) {
  let monthName = "";
  const month = calendar.months.find(x => x.position === date.month);
  if (month) {
    monthName = month.name;
  }
  const fantasyDate = date as FantasyDate;
  if (typeof(fantasyDate.year) !== "undefined"){
    return `${monthName} ${getDayString(date.dayOfMonth)}, ${fantasyDate.year}`;
  }
  else{
    return `${monthName} ${getDayString(date.dayOfMonth)}`;
  }
}


export function getDayString(dayNum: number) {
  if (dayNum === 1) {
    return "1st";
  }
  else if (dayNum === 2) {
    return "2nd";
  }
  else if (dayNum === 3) {
    return "3rd";
  }
  else {
    return dayNum + "th";
  }
}

