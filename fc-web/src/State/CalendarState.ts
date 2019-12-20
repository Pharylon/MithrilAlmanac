import {observable} from "mobx";
import CalendarEvent from "../Models/CalendarEvent";
import FantasyDate from "../Models/FantasyDate";
import { GetCalendar, GetCalendarEvents } from "../DataClients/CalendarEventDataClient";
import {CalendarModel} from "../Models/CalendarModel";

interface ICalendarState {
  calendar: CalendarModel;
  yearView: number;
  selectedDay: FantasyDate | undefined;
  events: CalendarEvent[];
  incrementYear: () => void;
  decrementYear: () => void;
  calendarEventEditId: string;
  setCalendar: (id: string) => void;
}

const blankModel: CalendarModel = {
  id: "__BLANK__",
  currentYear: -1,
  months: [],
  daysOfWeek: [],
};

const CalendarState = observable<ICalendarState>({
  calendar: blankModel,
  yearView: -1,
  selectedDay: undefined,
  events: [],
  incrementYear: () => CalendarState.yearView++,
  decrementYear: () => CalendarState.yearView--,
  calendarEventEditId: "",
  setCalendar: (id: string) => {
    if (id !== CalendarState.calendar.id){
      LoadCalendar(id);
    }    
  },
});

async function LoadCalendar(id: string) {
  console.log("Getting Calendar", id);
  const calendar = await GetCalendar(id);
  if (!calendar){
    CalendarState.calendar = blankModel;
    CalendarState.events = [];
    return;
  }
  CalendarState.calendar = calendar;
  if (CalendarState.yearView === -1){
    CalendarState.yearView = calendar.currentYear;
  }
  const events = await GetCalendarEvents(calendar.id);
  CalendarState.events = events;
}


export default CalendarState;
