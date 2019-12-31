import {CosmosClient, SqlQuerySpec} from "@azure/cosmos";
import CalendarEvent from "../Models/CalendarEvent";
import {CalendarModel} from "../Models/CalendarModel";
import UserCalendarDto from "../Models/UserCalendarDto";
import uuid = require("uuid");

const endpoint = process.env.endpoint;
const key = process.env.key;
const client = new CosmosClient({endpoint, key});

const db = client.database("fantasy-calendar");
const container = db.container("calendar-items");

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
    return response.resource as any;
  }
  throw new Error("Something went wrong");
}

export async function DeleteItem(resource: any): Promise<void> {
  const item = container.item(resource.id, resource.type);
  const foo = await item.delete(resource);
  console.log(foo);
}

export async function DeleteCalendar(id: string): Promise<void> {
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
    const resource = resources[0];
    if (resource.type === "calendar"){
      if (!resource.shareId){
        resource.shareId = uuid();
        await SaveCalendar(resource as CalendarModel);
      }
      return resource;
    }
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
