import {CalendarTemplate} from "../CalendarModel";

/* cSpell:disable */

const GreyhawkCalendar: CalendarTemplate = {
  currentDate: {
    dayOfMonth: 1,
    month: 1,
    year: 567,
  },
  daysOfWeek: [
    "Starday",
    "Sunday",
    "Moonday",
    "Godsday",
    "Waterday",
    "Earthday",
    "Freeday",
  ],
  months: [
    {name: "Needfest", days: 7, position: 1},
    {name: "Fireseek", days: 28, position: 2},
    {name: "Readying", days: 28, position: 3},
    {name: "Coldeven", days: 28, position: 4},
    {name: "Growfest", days: 7, position: 5},
    {name: "Planting", days: 28, position: 6},
    {name: "Flocktime", days: 28, position: 7},
    {name: "Wealsun", days: 28, position: 8},
    {name: "Richfest", days: 7, position: 9},
    {name: "Reaping", days: 28, position: 10},
    {name: "Goodmonth", days: 28, position: 11},
    {name: "Harvester", days: 28, position: 12},
    {name: "Brewfest", days: 7, position: 13},
    {name: "Patchwall", days: 28, position: 14},
    {name: "Ready'reat", days: 28, position: 15},
    {name: "Sunsebb", days: 28, position: 16},
  ],
  leapYearRules: {
    month: 0,
    interval: 0,
    unlessDivisions: [],
  },
  resetWeekAtMonthStart: false,
  holidays: [],
  moons: [
    {
      name: "Luna",
      daysToCycle: 28,
      cycleOffset: 17,
      color: "#fafbd2",
    },
    {
      name: "Celene",
      daysToCycle: 91,
      cycleOffset: 3,
      color: "rgb(127, 255, 212)",
    },
  ],
  offSetDays: 0,
};

export default GreyhawkCalendar;
