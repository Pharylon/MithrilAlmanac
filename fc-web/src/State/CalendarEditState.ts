import {observable} from "mobx";
import { GetCalendar } from "../DataClients/CalendarEventDataClient";
import { CalendarModel, blankModel } from "../Models/CalendarModel";

interface ICalendarEditState {
  calendar: CalendarModel;
  calendarEventEditId: string | undefined;
  setCalendar: (id: string) => void;
  calendarLoadState: "Blank" | "Loaded" | "Loading" | "Error";
  updateMonthName: (position: number, newName: string) => void;
  monthEditPosition: number | undefined;
}


const CalendarEditState = observable<ICalendarEditState>({
  calendarLoadState: "Blank",
  calendar: blankModel,
  calendarEventEditId: undefined,
  setCalendar: (id: string) => {
    if (id !== CalendarEditState.calendar.id){
      LoadCalendar(id);
    }    
  },
  updateMonthName: (position: number, newName: string) => {
    const month = CalendarEditState.calendar.months.find(x => x.position === position);
    if (month){
      month.name = newName;
    }
  },
  monthEditPosition: undefined,
  
});



async function LoadCalendar(id: string) {
  CalendarEditState.calendarLoadState = "Loading";
  const calendar = await GetCalendar(id);
  if (!calendar){
    CalendarEditState.calendar = {
      ...blankModel,
      id: "__ERROR__",
    };
    CalendarEditState.calendarLoadState = "Error";
    return;
  }
  CalendarEditState.calendar = calendar;
  CalendarEditState.calendarLoadState = "Loaded";
}


export default CalendarEditState;
