import {CalendarTemplate} from "../CalendarModel";

/* cSpell:disable */

const ExandriaCalendar: CalendarTemplate = {
  currentYear: 836,
  daysOfWeek: [
    "Miresen",
    "Grissen",
    "Whelsen",
    "Conthsen",
    "Folsen",
    "Yulisen",
    "Da'leysen",
  ],
  months: [
    {name: "Horisal", days: 29, position: 1},
    {name: "Misuthar", days: 30, position: 2},
    {name: "Dualahei", days: 30, position: 3},
    {name: "Thunsheer", days: 31, position: 4},
    {name: "Unndilar", days: 28, position: 5},
    {name: "Brussendar", days: 31, position: 6},
    {name: "Sydenstar", days: 32, position: 7},
    {name: "Fessuran", days: 29, position: 8},
    {name: "Quen'pillar ", days: 27, position: 9},
    {name: "Cuersaar", days: 29, position: 10},
    {name: "Duscar", days: 32, position: 11},
  ],
  leapYearRules: {
    month: 0,
    interval: 0,
    unlessDivisions: [],
  },
  resetWeekAtMonthStart: false,
  holidays: [
    {
      name: "New Dawn",
      date: {month: 1, dayOfMonth: 1},
    },
  ],
  moons: [],
  offSetDays: 0,
};

export default ExandriaCalendar;
