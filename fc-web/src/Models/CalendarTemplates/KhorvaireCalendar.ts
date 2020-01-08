import {CalendarTemplate} from "../CalendarModel";

/* cSpell:disable */

const EberronCalendar: CalendarTemplate = {
  currentYear: 998,
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
    // {
    //   name: "Crystalfall",
    //   date: {month: 2, dayOfMonth: 9},
    // },
    // {
    //   name: "The Day of Mourning",
    //   date: {month: 9, dayOfMonth: 20},
    // },
    // {
    //   name: "Sun's Blessing",
    //   date: {month: 3, dayOfMonth: 15},
    // },
    // {
    //   name: "Aureon's Crown",
    //   date: {month: 5, dayOfMonth: 26},
    // },
    // {
    //   name: "Brightblade",
    //   date: {month: 6, dayOfMonth: 12},
    // },
    // {
    //   name: "The Race of Eight Winds",
    //   date: {month: 9, dayOfMonth: 32},
    // },
  ],
  moons: [],
};

export default EberronCalendar;
