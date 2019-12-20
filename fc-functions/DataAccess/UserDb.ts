import CalendarEvent from "../Models/CalendarEvent";
import {CalendarModel} from "../Models/CalendarModel";
import {container} from "./DbClient";
import { SqlQuerySpec } from "@azure/cosmos";
import { UserModel } from "../Models/UserModel";
import uuid = require("uuid");
import { TokenPayload } from "google-auth-library/build/src/auth/loginticket";

export async function GetOrAddUserModelByGoogleId(googleId: string, tokenPayload: TokenPayload): Promise<UserModel> {
  const query: SqlQuerySpec = {
    query: "SELECT TOP 1 * FROM root r WHERE r.googleId = @googleId",
    parameters: [
      {
        name: "@googleId",
        value: googleId,
      },
    ],
  };
  const {resources} = await container.items.query(query).fetchAll();
  if (resources.length){
    return resources[0];
  }
  else{
    const model = await CreateUser(googleId, tokenPayload);
    return model;
  }
}

export async function CreateUser(googleId: string, tokenPayload: TokenPayload): Promise<UserModel> {
  const newUser: UserModel = {
    id: uuid(),
    userName: tokenPayload.email,
    ownedCalendars: [],
    memberCalendars: [],
    googleId,
  };
  const dataObj = newUser as any;
  dataObj.type = "user";
  const response = await container.items.create(dataObj);
  if (response.resource){
    return response.resource;
  }
  throw new Error("Something went wrong");
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

