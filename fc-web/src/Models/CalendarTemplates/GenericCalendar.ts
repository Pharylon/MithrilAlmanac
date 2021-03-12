import {CalendarTemplate} from "../CalendarModel";

const now = new Date();

const GenericCalendar: CalendarTemplate = {
  currentDate: {
    year: now.getFullYear(),
    dayOfMonth: now.getDate(),
    month: now.getMonth() + 1,
  },
  daysOfWeek: [
    "Day1",
    "Day2",
    "Day3",
    "Day4",
    "Day5",
    "Day6",
    "Day7",
  ],
  months: [
    {name: "Month1", days: 30, position: 1},
    {name: "Month2", days: 30, position: 2},
    {name: "Month3", days: 30, position: 3},
    {name: "Month4", days: 30, position: 4},
    {name: "Month5", days: 30, position: 5},
    {name: "Month6", days: 30, position: 6},
    {name: "Month7", days: 30, position: 7},
    {name: "Month8", days: 30, position: 8},
    {name: "Month9", days: 30, position: 9},
    {name: "Month10", days: 30, position: 10},
    {name: "Month11", days: 30, position: 11},
    {name: "Month12", days: 30, position: 12},
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
  ],
  moons: [
    {
      name: "The Moon",
      daysToCycle: 28,
      color: "#fcf9b1",
      cycleOffset: 15,
    },
  ],
  offSetDays: 1,
};

export default GenericCalendar;

