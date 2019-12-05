import {CosmosClient, SqlQuerySpec} from "@azure/cosmos";
import CalendarEvent from "../Models/CalendarEvent";

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

export async function GetAllCalendarEvents(): Promise<CalendarEvent[]>{
  const query: SqlQuerySpec = {
    //query: "SELECT * FROM root r",
    query: "SELECT r.id, r.name, r.description, r.fantasyDate, r.realDate FROM root r",
  };
  const {resources} = await container.items.query(query).fetchAll();
  return resources;
}
