import {get, post} from "./fetchHelper";
import CalendarEvent from "../Models/CalendarEvent";
import {CalendarModel, CalendarInsertDto} from "../Models/CalendarModel";
import { UserModel } from "../Models/UserModel";
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
    return asEvents;
  }
  return [];
}

export async function UpsertEvent(event: CalendarEvent): Promise<CalendarEvent | undefined>{
  const response = await post("UpdateEvent", event);
  if (response.success){
    const newEvent = response.value as CalendarEvent;
    if (newEvent){
      return newEvent;
    }
  }
  return undefined;
}


export async function AddCalendar(calendarModel: CalendarInsertDto): Promise<string>{
  const response = await post("CreatCalendar", calendarModel);
  if (response.success){
    const payload = response.value as {id: string};
    if (payload){
      return payload.id;
    }
  }
  return "";
}

export async function AuthenticateUser(token: string): Promise<void> {
  const response = await post("AuthenticateUser", {token});
  if (response.success){
    const userModel = response.value as UserModel;
    UserState.setAccessToken(token);
    UserState.userName = userModel.userName;
    UserState.updateCalendars();
  }
}

export async function GetUserCalendars(): Promise<UserCalendarDto[]> {
  const response = await get("GetUserCalendars");
  if (response.success){
    const models = response.value as UserCalendarDto[];
    return models;
  }
  return [];
}

