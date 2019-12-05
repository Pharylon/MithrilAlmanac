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
  incrementYear: () => void;
  decrementYear: () => void;
}

const CalendarState = observable<ICalendarState>({
  calendar: GreyhawkCalendar,
  events: [],
  currentYear: 567,
  selectedDay: undefined,
  incrementYear: () => CalendarState.currentYear++,
  decrementYear: () => CalendarState.currentYear--,
});

async function GetTestEvents(): Promise<CalendarEvent[]> {
  const response = await fetch("./testEvents.json");
  const payload = await response.json();
  CalendarState.events = payload;
  return payload;
}

GetTestEvents();

export default CalendarState;
