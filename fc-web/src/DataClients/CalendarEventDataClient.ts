import {get, post} from "./fetchHelper";
import CalendarEvent from "../Models/CalendarEvent";
import {CalendarModel} from "../Models/CalendarModel";
import CalendarState from "../State/CalendarState";


export async function GetCalendar(id: string): Promise<CalendarModel | undefined>{
  if (!id){
    id = "9a865260-1f8f-11ea-97ed-9555018c1b02";
  }
  const response = await get("GetCalendar", {id});
  if (response.success){
    const asCalendar = response.value as CalendarModel;
    if (!asCalendar){
      return undefined;
    }
    return asCalendar;
  }
  return undefined;
}

export async function GetCalendarEvents(id: string): Promise<CalendarEvent[]>{
  const response = await get("GetCalendarEvents", {id});
  if (response.success){
    const asEvents = response.value as CalendarEvent[];
    if (!asEvents){
      return [];
    }
    return asEvents;
  }
  return [];
}

export async function UpsertEvent(event: CalendarEvent): Promise<void>{
  const response = await post("UpdateEvent", event);
  console.log("NEW EVENT", response);
  if (response.success){
    const newEvent = response.value as CalendarEvent;
    if (newEvent){
      const oldEvent = CalendarState.events.find(x => x.id === newEvent.id);
      if (!oldEvent){
        CalendarState.events.push(newEvent);
      }
      else{
        const stillGoodEvents = CalendarState.events.filter(x => x.id !== newEvent.id);
        CalendarState.events = [newEvent, ...stillGoodEvents];
      }
    }
  }
}

export async function AuthenticateUser(token: string): Promise<void> {
  const response = await post("AuthenticateUser", {token});
  console.log(response);
}
