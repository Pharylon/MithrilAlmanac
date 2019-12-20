import {CalendarTemplate} from "./CalendarModel";

const TorilCalendar: CalendarTemplate = {
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
    {name: "The Claw of Winter", days: 30, position: 3},
    {name: "The Claw of the Sunsets ", days: 30, position: 4},
    {name: "The Claw of the Storms ", days: 31, position: 5},
    {name: "The Melting ", days: 30, position: 7},
    {name: "The Time of Flowers ", days: 30, position: 8},
    {name: "Summertide", days: 31, position: 9},
    {name: "Highsun", days: 30, position: 11},
    {name: "The Fading", days: 31, position: 12},
    {name: "Leaffall", days: 30, position: 14},
    {name: "The Rotting ", days: 31, position: 15},
    {name: "The Drawing Down", days: 30, position: 17},
  ],
};

export default TorilCalendar;
