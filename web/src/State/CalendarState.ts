import {observable} from "mobx";
import GreyhawkCalendar from "../Models/GreyhawkCalendar";
import CalendarEvent from "../Models/CalendarEvent";
import YearSettings from "../Models/Year";
import FantasyDate from "../Models/FantasyDate";

interface ICalendarState {
  calendar: YearSettings;
  events: CalendarEvent[];
  currentYear: number;
  selectedDay: FantasyDate | undefined;
}

const CalendarState = observable<ICalendarState>({
  calendar: GreyhawkCalendar,
  events: [],
  currentYear: 567,
  selectedDay: undefined,
});

async function GetTestEvents(): Promise<CalendarEvent[]> {
  const response = await fetch("./testEvents.json");
  const payload = await response.json();
  CalendarState.events = payload;
  return payload;
}

GetTestEvents();

export default CalendarState;
