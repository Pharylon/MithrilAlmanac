import {observable} from "mobx";
import { GetCalendar } from "../DataClients/CalendarEventDataClient";
import { CalendarModel, blankModel } from "../Models/CalendarModel";

interface IEditCalendarState {
  calendar: CalendarModel;
  calendarEventEditId: string | undefined;
  setCalendar: (id: string) => void;
  calendarLoadState: "Blank" | "Loaded" | "Loading" | "Error";
  updateMonthName: (position: number, newName: string) => void;
  monthEditPosition: number | undefined;
}


const EditCalendarState = observable<IEditCalendarState>({
  calendarLoadState: "Blank",
  calendar: blankModel,
  calendarEventEditId: undefined,
  setCalendar: (id: string) => {
    if (id !== EditCalendarState.calendar.id){
      LoadCalendar(id);
    }    
  },
  updateMonthName: (position: number, newName: string) => {
    const month = EditCalendarState.calendar.months.find(x => x.position === position);
    if (month){
      month.name = newName;
    }
  },
  monthEditPosition: undefined,
  
});



async function LoadCalendar(id: string) {
  try{
    EditCalendarState.calendarLoadState = "Loading";
    const calendar = await GetCalendar(id);
    if (!calendar){
      console.log("No Calendar");
      EditCalendarState.calendar = {
        ...blankModel,
        id: "__ERROR__",
      };
      EditCalendarState.calendarLoadState = "Error";
    }
    else{
      EditCalendarState.calendar = calendar;
      EditCalendarState.calendarLoadState = "Loaded";
    }

  }
  catch (e){
    EditCalendarState.calendarLoadState = "Error";
  }
}


export default EditCalendarState;
