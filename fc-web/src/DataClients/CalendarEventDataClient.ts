import {get, post} from "./fetchHelper";
import CalendarEvent from "../Models/CalendarEvent";
import CalendarModel from "../Models/CalendarModel";
import CalendarState from "../State/CalendarState";


export async function GetCalendar(): Promise<CalendarModel | undefined>{
  const response = await get("GetCalendar", {id: "9a865260-1f8f-11ea-97ed-9555018c1b02"});
  if (response.success){
    const asCalendar = response.value as CalendarModel;
    if (!asCalendar){
      return undefined;
    }
    return asCalendar;
  }
  return undefined;
}

export async function UpsertEvent(event: CalendarEvent): Promise<void>{
  const response = await post("UpdateEvent", event);
  console.log("NEW EVENT", response);
  if (response.success){
    const newEvent = response.value as CalendarEvent;
    if (newEvent){
      const oldEvent = CalendarState.calendar.events.find(x => x.id === newEvent.id);
      if (!oldEvent){
        CalendarState.calendar.events.push(newEvent);
      }
      else{
        const stillGoodEvents = CalendarState.calendar.events.filter(x => x.id !== newEvent.id);
        CalendarState.calendar.events = [newEvent, ...stillGoodEvents];
      }
    }
  }
}
