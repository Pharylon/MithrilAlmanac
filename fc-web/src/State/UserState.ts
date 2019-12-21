import {observable} from "mobx";
import { GetUserCalendars } from "../DataClients/CalendarEventDataClient";

interface CalendarId {
  id: string;
  name: string;
}

interface IUserState {
  loginModalOpen: boolean;
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;
  userName: string;
  calendars: CalendarId[];
  updateCalendars: () => Promise<void>;
}

const UserState = observable<IUserState>({
  loginModalOpen: false,
  getAccessToken: () => localStorage.getItem("accessToken"),
  setAccessToken: (token: string) => localStorage.setItem("accessToken", token),
  userName: "",
  calendars: [],
  updateCalendars: async () => {
    const token = UserState.getAccessToken();
    if (token){
      const calendars = await GetUserCalendars();
      if (calendars){
        UserState.calendars = calendars;
      }
    }
  },
});



export default UserState;
