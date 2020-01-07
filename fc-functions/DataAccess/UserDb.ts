import CalendarEvent from "../Models/CalendarEvent";
import {container} from "./DbClient";
import { SqlQuerySpec } from "@azure/cosmos";
import { UserModel } from "../Models/UserModel";
import uuid = require("uuid");
import { Credentials } from "google-auth-library";
// import {UserCache} from "./Caching";

// tslint:disable-next-line:max-line-length
export async function GetOrAddUserModelByGoogle(googleId: string, email: string, googleCredentials?: Credentials): Promise<UserModel> {
  // if (UserCache.has(googleId)){
  //   return UserCache.get(googleId);
  // }
  let user = await getUserFromGoogleId(googleId);
  if (!user){
    user = await CreateUser(googleId, email, googleCredentials);
  }
  // UserCache.set(googleId, user, 60);
  return user;
}

async function getUserFromGoogleId(googleId: string): Promise<UserModel | undefined>{
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
  if (resources.length && resources[0].type === "user"){
    return resources[0];
  }
  return undefined;
}

export async function updateUser(user: UserModel): Promise<UserModel | undefined>{
  const updated = await container.items.upsert(user);
  return updated.resource as any;
}

export async function CreateUser(googleId: string, email: string, googleCredentials: Credentials): Promise<UserModel> {
  function getGoogleTokens(){
    if (googleCredentials){
      return {
        refreshToken: googleCredentials.refresh_token,
        accessToken: googleCredentials.access_token,
      };
    }
    return undefined;
  }
  const newUser: UserModel = {
    id: uuid(),
    userName: email,
    ownedCalendars: [],
    memberCalendars: [],
    googleId,
    googleTokens: getGoogleTokens(),
  };
  const dataObj = newUser as any;
  dataObj.type = "user";
  const response = await container.items.create(dataObj);
  if (response.resource){
    return response.resource;
  }
  throw new Error("Something went wrong");
}

export async function AddCalendarToUser(googleId: string, calendarId: string, owner: boolean): Promise<void> {
  const user = await getUserFromGoogleId(googleId);
  if (owner){
    user.ownedCalendars.push(calendarId);
  }
  else{
    user.memberCalendars.push(calendarId);
  }
  await container.items.upsert(user);
  // UserCache.set(googleId, user);
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

