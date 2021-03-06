import { observable, action, computed } from "mobx";
import CalendarEvent from "../Models/CalendarEvent";
import FantasyDate from "../Models/FantasyDate";
import { GetCalendar, GetCalendarEvents } from "../DataClients/CalendarEventDataClient";
import { CalendarModel, blankModel } from "../Models/CalendarModel";
import uuid from "uuid";
import ErrorState from "./ErrorState";
import { post, ErrorObject } from "../DataClients/fetchHelper";
import UserState from "./UserState";
import CalendarEventEditModel from "../Models/CalendarEventEditModel";

interface ICalendarState {
  calendar: CalendarModel;
  selectedDay: FantasyDate | undefined;
  events: CalendarEvent[];
  calendarEditEvent: CalendarEventEditModel | undefined;
  loadCalendar: (id: string) => void;
  calendarLoadState: "Blank" | "Loaded" | "Loading" | "Error";
  addNewEvent: (props: FantasyDate) => void;
  updateEvent: (props: CalendarEventEditModel) => Promise<void>;
  updateMonthName: (position: number, newName: string) => void;
  reset: () => void;
  setSelectedDay: (date: FantasyDate) => void;
  canEditCalendar: boolean;
  createCalendarIsOpen: boolean;
}

export class CalendarStore implements ICalendarState {
  @observable calendarLoadState: "Blank" | "Loaded" | "Loading" | "Error" = "Blank";
  @observable calendar = blankModel;
  @observable selectedDay: undefined | FantasyDate;
  @observable events: CalendarEvent[] = [];
  @observable calendarEditEvent: CalendarEventEditModel | undefined;
  @observable createCalendarIsOpen = false;

  @action.bound
  public async loadCalendar(id: string){
    console.log("LoadCalendar", id);
    if (id !== this.calendar.id) {
      this.events = [];
      this.calendarLoadState = "Loading";
      const calendar = await GetCalendar(id);
      if (!calendar) {
        this.calendar = {
          ...blankModel,
          id: "",
        };
        this.events = [];
        this.calendarLoadState = "Error";
        localStorage.removeItem("LastCalendar");
        return;
      }
      this.calendar = calendar;
      this.calendarLoadState = "Loaded";
      localStorage.setItem("LastCalendar", id);
      const events = await GetCalendarEvents(calendar.id);
      this.events = events;
    }
  }

  @computed get canEditCalendar(): boolean{
    return !!UserState.userModel && UserState.calendars.some(x => x.id === this.calendar.id);
  }

  @action.bound
  public async addNewEvent(date: FantasyDate){
    if (!UserState.userModel){
      this.selectedDay = undefined;
      UserState.loginModalOpen = true;
      return;
    }
    if (!this.canEditCalendar){
      this.selectedDay = undefined;
      ErrorState.errorMessage = "You do not have permission to add events to this calendar.";
      return;
    }
    const newEvent: CalendarEventEditModel = {
      calendarEvent: {
        calendarId: this.calendar.id,
        fantasyDate: date,
        name: "Title",
        description: "",
        realDate: undefined,
        id: uuid(),
        createUser: UserState.userModel.id,
        hidden: false,
      },
      makeCurrentDate: false,
    };
    this.calendarEditEvent = newEvent;
  }

  @action.bound
  public async updateEvent(updateModel: CalendarEventEditModel){
    const oldEvents = this.events;
    try {
      const stillGoodEvents = this.events.filter(x => x.id !== updateModel.calendarEvent.id);
      this.events = [...stillGoodEvents, updateModel.calendarEvent];
      const response = await post("UpdateEvent", updateModel);
      if (response.success) {
        const newEvent = response.value as CalendarEvent;
        if (newEvent.id){
          this.events = [...stillGoodEvents, newEvent];
        }
      }
      else{
        console.log("FAIL");
        const defaultErrorMsg = "There was an error saving your event. " + 
        "If the problem persists, try logging out and logging back in again.";
        const errorObj = response.value as ErrorObject;
        this.events = oldEvents;
        ErrorState.errorMessage = errorObj.message || defaultErrorMsg;
      }
    }
    catch (e){
      console.log("Error updating events", e);
      this.events = oldEvents;
      ErrorState.errorMessage = "There was an error saving your event. " + 
        "If the problem persists, try logging out and logging back in again.";
    }
  }

  @action.bound
  public async updateMonthName(position: number, newName: string) {
    const month = this.calendar.months.find(x => x.position === position);
    if (month) {
      month.name = newName;
    }
  }

  

  @action.bound
  public async setSelectedDay(date: FantasyDate) {
    this.selectedDay = date;
  }

  @action.bound
  public reset() {
    this.calendar = blankModel;
    this.calendarLoadState = "Blank";
  }
}

// const OldCalendarState = observable<ICalendarState>({
//   calendarLoadState: "Blank",
//   calendar: blankModel,
//   selectedDay: undefined,
//   events: [],
//   calendarEditEvent: undefined,
//   setCalendar: (id: string) => {
//     if (id !== CalendarState.calendar.id) {
//       LoadCalendar(id);
//     }
//   },
//   addNewEvent: (date: FantasyDate) => {
//     const newEvent: CalendarEvent = {
//       calendarId: CalendarState.calendar.id,
//       fantasyDate: date,
//       name: "Title",
//       description: "",
//       realDate: undefined,
//       id: uuid(),
//     };
//     CalendarState.calendarEditEvent = newEvent;
//   },
//   updateEvent: async (myEvent: CalendarEvent): Promise<void> => {
//     const oldEvents = CalendarState.events;
//     try {
//       const stillGoodEvents = CalendarState.events.filter(x => x.id !== myEvent.id);
//       CalendarState.events = [...stillGoodEvents, myEvent];
//       const response = await post("UpdateEvent", myEvent);
//       if (response.success) {
//         const newEvent = response.value as CalendarEvent;
//         CalendarState.events = [...stillGoodEvents, newEvent];
//       }
//       else{
//         console.log("FAIL");
//         const defaultErrorMsg = "There was an error saving your event. " + 
//         "If the problem persists, try logging out and logging back in again.";
//         const errorObj = response.value as ErrorObject;
//         CalendarState.events = oldEvents;
//         ErrorState.errorMessage = errorObj.message || defaultErrorMsg;
//       }
//     }
//     catch (e){
//       console.log("Error updating events", e);
//       CalendarState.events = oldEvents;
//       ErrorState.errorMessage = "There was an error saving your event. " + 
//         "If the problem persists, try logging out and logging back in again.";
//     }
//   },
//   updateMonthName: (position: number, newName: string) => {
//     const month = CalendarState.calendar.months.find(x => x.position === position);
//     if (month) {
//       month.name = newName;
//     }
//   },
//   reset: () => {
//     CalendarState.calendar = blankModel;
//     CalendarState.calendarLoadState = "Blank";
//   },
//   viewType: "Calendar",
// });



// async function LoadCalendar(id: string) {
//   CalendarState.calendarLoadState = "Loading";
//   const calendar = await GetCalendar(id);
//   if (!calendar) {
//     CalendarState.calendar = {
//       ...blankModel,
//       id: "__ERROR__",
//     };
//     CalendarState.events = [];
//     CalendarState.calendarLoadState = "Error";
//     return;
//   }
//   CalendarState.calendar = calendar;
//   CalendarState.calendarLoadState = "Loaded";
//   const events = await GetCalendarEvents(calendar.id);
//   CalendarState.events = events;
// }

const CalendarState = new CalendarStore();

export default CalendarState;
