import {CosmosClient, SqlQuerySpec} from "@azure/cosmos";
import CalendarEvent from "../Models/CalendarEvent";
import CalendarModel from "../Models/CalendarModel";

const endpoint = process.env.endpoint;
const key = process.env.key;
const client = new CosmosClient({endpoint, key});

const db = client.database("fantasy-calendar");
const container = db.container("calendarEvents");

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

// export async function GetAllCalendarEvents(): Promise<CalendarEvent[]>{
//   const query: SqlQuerySpec = {
//     //query: "SELECT * FROM root r",
//     query: "SELECT r.id, r.name, r.description, r.fantasyDate, r.realDate FROM root r",
//   };
//   const {resources} = await container.items.query(query).fetchAll();
//   return resources;
// }

export async function AddEvent(calendarEvent: CalendarEvent): Promise<CalendarEvent> {
  const dataObject = calendarEvent as any;
  dataObject.type = "event";
  const response = await container.items.create(dataObject);
  if (response.resource){
    return response.resource;
  }
  throw new Error("Something went wrong");
}

export async function UpdateEvent(calendarEvent: CalendarEvent): Promise<CalendarEvent> {
  const dataObject = calendarEvent as any;
  dataObject.type = "event";
  const response = await container.items.upsert(dataObject);
  if (response.resource && response.resource.type === "event" && response.resource.id === calendarEvent.id){
    const myEvent = response.resource as any;
    if (myEvent){
      return myEvent;
    }
    return undefined;
  }
  throw new Error("Something went wrong");
}

export async function AddCalendar(model: CalendarModel): Promise<CalendarModel> {
  const dataObject = model as any;
  dataObject.type = "calendar";
  const response = await container.items.create(dataObject);
  if (response.resource){
    return response.resource;
  }
  throw new Error("Something went wrong");
}

export async function GetCalendar(id: string): Promise<CalendarModel> {
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
    const resource = resources[0];
    if (resource.type === "calendar"){
      return resource;
    }
  }
  return undefined;
}
