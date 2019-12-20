import {CosmosClient, SqlQuerySpec} from "@azure/cosmos";

const endpoint = process.env.endpoint;
const key = process.env.key;
const client = new CosmosClient({endpoint, key});

export const db = client.database("fantasy-calendar");
export const container = db.container("calendarEvents");
