import {CalendarTemplate} from "../CalendarModel";

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
    {name: "Deepwinter", days: 31, position: 1},
    {name: "The Claw of Winter", days: 30, position: 2},
    {name: "The Claw of the Sunsets ", days: 30, position: 3},
    {name: "The Claw of the Storms ", days: 31, position: 4},
    {name: "The Melting ", days: 30, position: 5},
    {name: "The Time of Flowers ", days: 30, position: 6},
    {name: "Summertide", days: 31, position: 7},
    {name: "Highsun", days: 30, position: 8},
    {name: "The Fading", days: 31, position: 9},
    {name: "Leaffall", days: 30, position: 10},
    {name: "The Rotting ", days: 31, position: 11},
    {name: "The Drawing Down", days: 30, position: 12},
  ],
  leapYearRules: {
    month: 9,
    interval: 4,
    unlessDivisions: [],
  },
};

export default TorilCalendar;
