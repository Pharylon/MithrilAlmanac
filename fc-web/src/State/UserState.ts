import { observable } from "mobx";
import { GetUserCalendars } from "../DataClients/CalendarEventDataClient";
import { get, post } from "../DataClients/fetchHelper";
import { UserModel } from "../Models/UserModel";
import { GetRefreshedToken } from "../DataClients/AuthenticationDataClient";
import { JoinPendingCalendars } from "../CalenderJoinHelper";

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
  updateCalendars: (disableJoinPending?: boolean) => Promise<void>;
  timeout: () => void;
  logOut: () => void;
  refreshToken: () => void;
  authenticateUser: (token: string) => Promise<void>;
}

const UserState = observable<IUserState>({
  loginModalOpen: false,
  getAccessToken: () => localStorage.getItem("accessToken"),
  setAccessToken: (token: string) => localStorage.setItem("accessToken", token),
  userName: "",
  calendars: [],
  updateCalendars: async (disableJoinPending?: boolean) => {
    const token = UserState.getAccessToken();
    if (token) {
      const calendars = await GetUserCalendars();
      if (calendars) {
        UserState.calendars = calendars;
      }
      const joinPending = await JoinPendingCalendars();
      //Prevent any nasty recursion.
      if (!disableJoinPending){
        if (joinPending){
          UserState.updateCalendars(true);
        }
      }      
    }
  },
  timeout: () => {
    UserState.userName = "";
    UserState.calendars = [];
    localStorage.removeItem("accessToken");
  },
  logOut: async () => {
    UserState.userName = "";
    UserState.calendars = [];
    localStorage.removeItem("accessToken");
    const result = await get("LogOut");
    if (!result.success) {
      console.log("There was an error attempting to log out");
    }
  },
  refreshToken: async () => {
    const oldToken = localStorage.getItem("accessToken");
    if (oldToken){
      const newToken = await GetRefreshedToken(oldToken);
      if (!newToken) {
        console.log("There was an error attempting to refresh token");
      }
      else {
        console.log("Got refresh token", newToken);
        UserState.setAccessToken(newToken);
      }
    }    
  },
  authenticateUser: async (token: string) => {
    const response = await post("AuthenticateUser", { token });
    if (response.success) {
      const userModel = response.value as UserModel;
      UserState.setAccessToken(token);
      UserState.userName = userModel.userName;
      UserState.updateCalendars();
    }
  },
});



export default UserState;
