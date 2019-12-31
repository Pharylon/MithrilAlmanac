import { post } from "./DataClients/fetchHelper";
import UserState from "./State/UserState";

export default async function JoinCalendarHelper(calendarId: string){
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("joinId")){
    const joinId = urlParams.get("joinId");
    const response = await post("JoinCalendar", {joinId, calendarId});
    if (response.success){
      await UserState.updateCalendars();
    }
  }
}
