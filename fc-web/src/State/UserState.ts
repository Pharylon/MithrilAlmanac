import { observable } from "mobx";
import { GetUserCalendars } from "../DataClients/CalendarEventDataClient";
import { get, post } from "../DataClients/fetchHelper";
import { UserModel } from "../Models/UserModel";

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
  updateCalendars: async () => {
    const token = UserState.getAccessToken();
    if (token) {
      const calendars = await GetUserCalendars();
      if (calendars) {
        UserState.calendars = calendars;
      }
    }
  },
  timeout: () => {
    UserState.userName = "";
    UserState.calendars = [];
    localStorage.removeItem("accessToken");
  },
  logOut: async () => {
    const result = await get("LogOut");
    if (!result.success) {
      console.log("There was an error attempting to log out");
    }
    UserState.userName = "";
    UserState.calendars = [];
    //localStorage.removeItem("accessToken");
  },
  refreshToken: async () => {
    const oldToken = localStorage.getItem("accessToken");
    const result = await get("GetToken", { token: oldToken });
    if (!result.success) {
      console.log("There was an error attempting to refresh token");
    }
    else {
      const token = (result.value as any).token;
      console.log("Got refresh token", token);
      UserState.setAccessToken(token);
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
  }
});



export default UserState;
