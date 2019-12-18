import {observable} from "mobx";
import CalendarEvent from "../Models/CalendarEvent";
import FantasyDate from "../Models/FantasyDate";
import { GetCalendar, GetCalendarEvents } from "../DataClients/CalendarEventDataClient";
import {CalendarModel} from "../Models/CalendarModel";

interface ICalendarState {
  calendar: CalendarModel;
  currentYear: number;
  selectedDay: FantasyDate | undefined;
  events: CalendarEvent[];
  incrementYear: () => void;
  decrementYear: () => void;
  calendarEventEditId: string;
}

const blankModel: CalendarModel = {
  id: "__BLANK__",
  currentYear: -1,
  months: [],
  weekLength: 7,
};

const CalendarState = observable<ICalendarState>({
  calendar: blankModel,
  currentYear: -1,
  selectedDay: undefined,
  events: [],
  incrementYear: () => CalendarState.currentYear++,
  decrementYear: () => CalendarState.currentYear--,
  calendarEventEditId: "",

});

async function GetTextCalendar() {
  const calendar = await GetCalendar();
  if (calendar){
    CalendarState.calendar = calendar;
    if (CalendarState.currentYear === -1){
      CalendarState.currentYear = calendar.currentYear;
    }
    const events = await GetCalendarEvents(calendar.id);
    console.log("MY EVENTS", events);
    CalendarState.events = events;
  }  
}

GetTextCalendar();

export default CalendarState;
