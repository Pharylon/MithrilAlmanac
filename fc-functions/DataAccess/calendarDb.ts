import { SqlQuerySpec} from "@azure/cosmos";
import CalendarEvent from "../Models/CalendarEvent";
import {CalendarModel} from "../Models/CalendarModel";
import UserCalendarDto from "../Models/UserCalendarDto";
import uuid = require("uuid");
import { container } from "./DbClient";
// import { CalendarCache } from "./Caching";



export async function GetCalendarEvent(id: string): Promise<CalendarEvent | undefined> {
  const query: SqlQuerySpec = {
    query: "SELECT * FROM root r WHERE r.id = @id",
    parameters: [
      {
        name: "@id",
        value: id,
      },
    ],
  };
  const {resources} = await container.items.query(query).fetchAll();
  if (resources.length){
    return resources[0];
  }
  return undefined;
}

export async function GetAllCalendarEvents(id: string): Promise<CalendarEvent[]>{
  const query: SqlQuerySpec = {
    query: "SELECT * FROM root r WHERE r.calendarId = @id and r.type = @type",
    parameters: [
      {
        name: "@id",
        value: id,
      },
      {
        name: "@type",
        value: "calendarEvent",
      },
    ],
  };
  const {resources} = await container.items.query(query).fetchAll();
  return resources;
}


export async function UpdateEvent(calendarEvent: CalendarEvent): Promise<CalendarEvent> {
  const dataObject = calendarEvent as any;
  dataObject.type = "calendarEvent";
  dataObject.saveDate = (new Date()).getTime();
  const response = await container.items.upsert(dataObject);
  if (response.resource && response.resource.type === "calendarEvent" && response.resource.id === calendarEvent.id){
    const myEvent = response.resource as any;
    if (myEvent){
      return myEvent;
    }
    return undefined;
  }
  throw new Error("Something went wrong");
}

export async function SaveCalendar(model: CalendarModel): Promise<CalendarModel> {
  const dataObject = model as any;
  dataObject.type = "calendar";
  const response = await container.items.upsert(dataObject);
  if (response.resource){
    // CalendarCache.set(model.id, response.resource, 300);
    return response.resource as any;    
  }
  throw new Error("Something went wrong");
}

async function DeleteItem(resource: any): Promise<void> {
  if (resource.id){
    const item = container.item(resource.id, resource.type);
    const deletion = await item.delete(resource);
    console.log(deletion);
  }
  else{
    throw new Error("Couldn't delete an item with no id");
  }  
}

export async function DeleteEvent(event: CalendarEvent): Promise<void> {
  await DeleteItem(event);
}

export async function DeleteCalendar(id: string): Promise<void> {
  // if (CalendarCache.has(id)){
  //   CalendarCache.del(id);
  // }
  const query: SqlQuerySpec = {
    query: "SELECT * FROM root r WHERE r.id = @id",
    parameters: [
      {
        name: "@id",
        value: id,
      },
    ],
  };
  const {resources} = await container.items.query(query).fetchAll();
  await DeleteItem(resources[0]);
}



export async function GetCalendar(id: string): Promise<CalendarModel> {
  // if (CalendarCache.has(id)){
  //   return CalendarCache.get(id);
  // }
  const query: SqlQuerySpec = {
    query: "SELECT * FROM root r WHERE r.id = @id and r.type = @type",
    parameters: [
      {
        name: "@id",
        value: id,
      },
      {
        name: "@type",
        value: "calendar",
      },
    ],
  };
  const {resources} = await container.items.query(query).fetchAll();
  if (resources.length){
    const calendar = resources[0] as CalendarModel;
    if (!calendar.shareId){
      calendar.shareId = uuid();
      await SaveCalendar(calendar);
    }
    if (!calendar.moons){
      calendar.moons = [];
      await SaveCalendar(calendar as CalendarModel);
    }
    if (typeof(calendar.offSetDays) === "undefined"){
      calendar.offSetDays = 0;
      await SaveCalendar(calendar as CalendarModel);
    }
    // CalendarCache.set(id, calendar, 300);
    return calendar;
  }
  return undefined;
}


export async function GetUserCalendars(ids: string[]): Promise<UserCalendarDto[]> {
  const parameters = ids.map((x, i) => ({
    name: "@id" + i,
    value: x,
  }));
  const paramString = parameters.map(x => x.name).join(", ");
  const query: SqlQuerySpec = {
    query: `SELECT c.id, c.name FROM c where c.type = 'calendar' and c.id in (${paramString})`,
    parameters,
  };
  const {resources} = await container.items.query(query).fetchAll();
  const myObjects = resources as UserCalendarDto[];
  return myObjects;
}
