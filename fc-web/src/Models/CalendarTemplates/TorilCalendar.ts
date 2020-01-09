import {CalendarTemplate} from "../CalendarModel";

/* cSpell:disable */

const TorilCalendar: CalendarTemplate = {
  currentYear: 1491,
  daysOfWeek: [
    "FirstDay",
    "SecondDay",
    "ThirdDay",
    "FourthDay",
    "FifthDay",
    "SixthDay",
    "SeventhDay",
    "EighthDay",
    "NinthDay",
    "TenthDay",
  ],
  months: [
    {name: "Hammer, Deepwinter", days: 31, position: 1},
    {name: "Alturaik, The Claw of Winter", days: 30, position: 2},
    {name: "Ches, The Claw of the Sunsets", days: 30, position: 3},
    {name: "Tarsakh, The Claw of the Storms", days: 31, position: 4},
    {name: "Mirtul, The Melting ", days: 30, position: 5},
    {name: "Kythorn, The Time of Flowers", days: 30, position: 6},
    {name: "Flamerule, Summertide", days: 31, position: 7},
    {name: "Eleasis, Highsun", days: 30, position: 8},
    {name: "Eleint, The Fading", days: 31, position: 9},
    {name: "Marpenoth, Leaffall", days: 30, position: 10},
    {name: "Uktar, The Rotting ", days: 31, position: 11},
    {name: "Nightal, The Drawing Down", days: 30, position: 12},
  ],
  leapYearRules: {
    month: 9,
    interval: 4,
    unlessDivisions: [],
  },
  resetWeekAtMonthStart: true,
  holidays: [
    {
      name: "Midwinter",
      date: {month: 1, dayOfMonth: 31},
    },
    {
      name: "Greengrass",
      date: {month: 4, dayOfMonth: 31},
    },
    {
      name: "Midsummer",
      date: {month: 7, dayOfMonth: 31},
    },
    {
      name: "Highharvestide",
      date: {month: 9, dayOfMonth: 31},
    },
    {
      name: "Feast of the Moon",
      date: {month: 11, dayOfMonth: 31},
    },
    {
      name: "Shieldmeet",
      date: {month: 9, dayOfMonth: 32},
    },
  ],
  moons: [
    {
      name: "Selûne",
      daysToCycle: 30.4375,
      cycleOffset: -0.5,
      color: "#fafbd2",
    },
  ],
  offSetDays: 0,
};

export default TorilCalendar;
