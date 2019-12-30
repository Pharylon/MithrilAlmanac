import {CalendarTemplate} from "../CalendarModel";

const EarthCalendar: CalendarTemplate = {
  currentYear: new Date().getFullYear(),
  daysOfWeek: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  months: [
    {name: "January", days: 31, position: 1},
    {name: "February", days: 28, position: 2},
    {name: "March", days: 31, position: 3},
    {name: "April", days: 30, position: 4},
    {name: "May", days: 31, position: 5},
    {name: "June", days: 30, position: 6},
    {name: "July", days: 31, position: 7},
    {name: "August", days: 31, position: 8},
    {name: "September", days: 30, position: 9},
    {name: "October", days: 31, position: 10},
    {name: "November", days: 30, position: 11},
    {name: "December", days: 31, position: 12},
  ],
  leapYearRules: {
    month: 2,
    interval: 4,
    unlessDivisions: [100, 400],
  },
  resetWeekAtMonthStart: false,
  holidays: [
    {
      name: "New Year",
      date: {month: 1, dayOfMonth: 1},
    },
    {
      name: "Festivus",
      date: {month: 12, dayOfMonth: 23},
    },
  ],
};

export default EarthCalendar;
