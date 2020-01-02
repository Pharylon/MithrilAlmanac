import {get, post} from "./fetchHelper";
import CalendarEvent from "../Models/CalendarEvent";
import {CalendarModel} from "../Models/CalendarModel";
import UserState from "../State/UserState";
import UserCalendarDto from "../Models/UserCalendarDto";

export async function GetCalendar(id: string): Promise<CalendarModel | undefined>{
  // if (!id){
  //   id = "9a865260-1f8f-11ea-97ed-9555018c1b02";
  // }
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
    asEvents.forEach(element => {
      //The dates are actually strings instead of Date objects right now.
      //Let's fix that!
      if (element.realDate){
        element.realDate = new Date(element.realDate);
      }
    });
    return asEvents;
  }
  return [];
}

// export async function UpsertEvent(event: CalendarEvent): Promise<Result>{
//   const response = await post("UpdateEvent", event);
//   return response;
// }

export async function DeleteEvent(eventId: string): Promise<void>{
  const response = await post("DeleteEvent", {id: eventId});
  if (!response.success){
    throw new Error("There was an error deleting the event");
  }
}


export async function SaveCalendar(calendarModel: CalendarModel): Promise<string>{
  const response = await post("SaveCalendar", calendarModel);
  if (response.success){
    const payload = response.value as {id: string};
    if (payload){
      return payload.id;
    }
  }
  return "";
}

export async function DeleteCalendar(id: string): Promise<void>{
  const response = await post("DeleteCalendar", {id});
  if (response.success){
    await UserState.updateCalendars();
    return;
  }
  throw new Error("Something went wrong trying to delete the calendar");
}


export async function GetUserCalendars(): Promise<UserCalendarDto[]> {
  const response = await get("GetUserCalendars");
  if (response.success){
    const models = response.value as UserCalendarDto[];
    return models;
  }
  return [];
}

