import {observable} from "mobx";
import GreyhawkCalendar from "../Models/GreyhawkCalendar";
import CalendarEvent from "../Models/CalendarEvent";
import YearSettings from "../Models/CalendarTemplate";
import FantasyDate from "../Models/FantasyDate";
import { GetCalendar } from "../DataClients/CalendarEventDataClient";
import CalendarModel from "../Models/CalendarModel";

interface ICalendarState {
  calendar: CalendarModel;
  currentYear: number;
  selectedDay: FantasyDate | undefined;
  incrementYear: () => void;
  decrementYear: () => void;
}

const blankModel: CalendarModel = {
  id: "__BLANK__",
  currentYear: -1,
  events: [],
  months: [],
  weekLength: 7,
};

const CalendarState = observable<ICalendarState>({
  calendar: blankModel,
  currentYear: -1,
  selectedDay: undefined,
  incrementYear: () => CalendarState.currentYear++,
  decrementYear: () => CalendarState.currentYear--,
});

async function GetTextCalendar() {
  const calendar = await GetCalendar();
  if (calendar){
    CalendarState.calendar = calendar;
    if (CalendarState.currentYear === -1){
      CalendarState.currentYear = calendar.currentYear;
    }
  }  
}

GetTextCalendar();

export default CalendarState;
