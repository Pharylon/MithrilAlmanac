import { post } from "./DataClients/fetchHelper";
import UserState from "./State/UserState";

export default async function JoinCalendarHelper(calendarId: string){
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("joinId")){
    const joinId = urlParams.get("joinId");
    if (joinId){
      if (UserState.userModel){
        joinCalendar(joinId, calendarId);
      }
      else{
        localStorage.setItem("toJoin", joinId + "|" + calendarId);
      }
    }  
  }
  else{
    const joinId = localStorage.getItem("JoinId");
    if (joinId){
      localStorage.removeItem("JoinId");
      await joinCalendar(joinId, calendarId);
    }
  }
}

export async function JoinPendingCalendars(): Promise<string | undefined> {
  const toJoin = localStorage.getItem("toJoin");
  if (toJoin){
    localStorage.removeItem("toJoin");
    const split = toJoin.split("|");
    if (split.length === 2){
      const joinId = split[0];
      const calendarId = split[1];
      await joinCalendar(joinId, calendarId);
      console.log("Joined calendar", calendarId);
      return calendarId;
    }
  }
}


async function joinCalendar(joinId: string, calendarId: string){
  const response = await post("JoinCalendar", {joinId, calendarId});
  if (response.success){
    await UserState.updateCalendars();
  }
}
