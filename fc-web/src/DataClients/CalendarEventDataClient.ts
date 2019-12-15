import {get} from "./fetchHelper";
import CalendarEvent from "../Models/CalendarEvent";


export async function GetAllCalendarEvents(): Promise<CalendarEvent[]>{
  const response = await get("GetAll");
  if (response.success){
    const asEvent = response.value as CalendarEvent[];
    if (!asEvent){
      return [];
    }
    return asEvent;
  }
  return [];
}
