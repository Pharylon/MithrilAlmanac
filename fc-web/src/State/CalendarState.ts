import {observable} from "mobx";
import CalendarEvent from "../Models/CalendarEvent";
import FantasyDate from "../Models/FantasyDate";
import { GetCalendar, GetCalendarEvents, UpsertEvent } from "../DataClients/CalendarEventDataClient";
import {CalendarModel, CheckIfLeapYear} from "../Models/CalendarModel";
import uuid from "uuid";

interface ICalendarState {
  calendar: CalendarModel;
  yearView: number;
  selectedDay: FantasyDate | undefined;
  events: CalendarEvent[];
  incrementYear: () => void;
  decrementYear: () => void;
  calendarEditEvent: CalendarEvent | undefined;
  setCalendar: (id: string) => void;
  isLeapYear: () => boolean;
  calendarLoadState: "Blank" | "Loaded" | "Loading" | "Error";
  addNewEvent: (props: FantasyDate) => void;
  updateEvent: (props: CalendarEvent) => Promise<void>;
  updateMonthName: (position: number, newName: string) => void;
  reset: () => void;
}

const blankModel: CalendarModel = {
  name: "",
  userId: "",
  id: "__BLANK__",
  currentYear: -1,
  months: [],
  daysOfWeek: [],
  leapYearRules: {
    month: 0,
    interval: 0,
    unlessDivisions: [],
  },
};

const CalendarState = observable<ICalendarState>({
  calendarLoadState: "Blank",
  calendar: blankModel,
  yearView: -1,
  selectedDay: undefined,
  events: [],
  incrementYear: () => CalendarState.yearView++,
  decrementYear: () => CalendarState.yearView--,
  calendarEditEvent: undefined,
  setCalendar: (id: string) => {
    if (id !== CalendarState.calendar.id){
      LoadCalendar(id);
    }    
  },
  isLeapYear: () => {
    const isLeapYear = CheckIfLeapYear(CalendarState.yearView, CalendarState.calendar);
    return isLeapYear;
  },
  addNewEvent: (date: FantasyDate) => {
    const newEvent: CalendarEvent = {
      calendarId: CalendarState.calendar.id,
      fantasyDate: date,
      name: "Title",
      description: "",
      realDate: undefined,
      id: uuid(),
    };
    CalendarState.calendarEditEvent = newEvent;
  },
  updateEvent: async (myEvent: CalendarEvent): Promise<void> => {
    const stillGoodEvents = CalendarState.events.filter(x => x.id !== myEvent.id);
    CalendarState.events = [...stillGoodEvents, myEvent];
    const newEvent = await UpsertEvent(myEvent);
    if (newEvent){
      CalendarState.events = [...stillGoodEvents, newEvent];
    }    
  },
  updateMonthName: (position: number, newName: string) => {
    const month = CalendarState.calendar.months.find(x => x.position === position);
    if (month){
      month.name = newName;
    }
  },
  reset: () => {
    CalendarState.calendar = blankModel;
    CalendarState.calendarLoadState = "Blank";
  },
});



async function LoadCalendar(id: string) {
  CalendarState.calendarLoadState = "Loading";
  const calendar = await GetCalendar(id);
  if (!calendar){
    CalendarState.calendar = {
      ...blankModel,
      id: "__ERROR__",
    };
    CalendarState.events = [];
    CalendarState.calendarLoadState = "Error";
    return;
  }
  CalendarState.calendar = calendar;
  CalendarState.yearView = calendar.currentYear;
  CalendarState.calendarLoadState = "Loaded";
  if (CalendarState.yearView === -1){
    CalendarState.yearView = calendar.currentYear;
  }
  const events = await GetCalendarEvents(calendar.id);
  CalendarState.events = events;
}


export default CalendarState;
