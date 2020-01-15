import {CalendarTemplate} from "../CalendarModel";

/* cSpell:disable */

const EberronCalendar: CalendarTemplate = {
  currentDate: {
    dayOfMonth: 1,
    month: 1,
    year: 998,
  },
  daysOfWeek: [
    "Sul",
    "Mol",
    "Zol",
    "Wir",
    "Zor",
    "Far",
    "Sar",
  ],
  months: [
    {name: "Zarantyr ", days: 28, position: 1},
    {name: "Olarune", days: 28, position: 2},
    {name: "Therendor", days: 28, position: 3},
    {name: "Eyre", days: 28, position: 4},
    {name: "Dravago", days: 28, position: 5},
    {name: "Nymm", days: 28, position: 6},
    {name: "Lharvion ", days: 28, position: 7},
    {name: "Barrakas", days: 28, position: 8},
    {name: "Rhaan", days: 28, position: 9},
    {name: "Aryth", days: 28, position: 10},
    {name: "Vult", days: 28, position: 11},
    {name: "Crya", days: 28, position: 12},
  ],
  leapYearRules: {
    month: 0,
    interval: 0,
    unlessDivisions: [],
  },
  resetWeekAtMonthStart: true,
  holidays: [
    {
      name: "The Day of Mourning",
      date: {month: 9, dayOfMonth: 20},
    },
    {
      name: "Thronehold",
      date: {month: 10, dayOfMonth: 11},
    },
  ],
  moons: [],
  offSetDays: 0,
};

export default EberronCalendar;
