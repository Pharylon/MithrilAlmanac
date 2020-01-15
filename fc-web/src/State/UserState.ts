import { observable } from "mobx";
import { GetUserCalendars } from "../DataClients/CalendarEventDataClient";
import { get, post } from "../DataClients/fetchHelper";
import { UserModel } from "../Models/UserModel";
import { GetRefreshedToken } from "../DataClients/AuthenticationDataClient";
import { JoinPendingCalendars } from "../CalenderJoinHelper";
import CalendarState from "./CalendarState";
import UserCalendarDto from "../Models/UserCalendarDto";

interface IUserState {
  loginModalOpen: boolean;
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;
  userModel: UserModel | undefined;
  calendars: UserCalendarDto[];
  updateCalendars: (disableJoinPending?: boolean) => Promise<void>;
  timeout: () => void;
  logOut: () => void;
  refreshToken: () => void;
  authenticateUser: (token: string) => Promise<void>;
  reset: () => void;
}

const UserState = observable<IUserState>({
  loginModalOpen: false,
  getAccessToken: () => localStorage.getItem("accessToken"),
  setAccessToken: (token: string) => localStorage.setItem("accessToken", token),
  userModel: undefined,
  calendars: [],
  updateCalendars: async (disableJoinPending?: boolean) => {
    const token = UserState.getAccessToken();
    if (token) {
      const calendars = await GetUserCalendars();
      if (calendars) {
        UserState.calendars = calendars;
        if (calendars.length === 0) {
          CalendarState.createCalendarIsOpen = true;
        }
      }
      const joinPending = await JoinPendingCalendars();
      //Prevent any nasty recursion.
      if (!disableJoinPending && joinPending) {
        UserState.updateCalendars(true);
      }
    }
  },
  timeout: () => {
    UserState.userModel = undefined;
    UserState.calendars = [];
    localStorage.removeItem("accessToken");
  },
  reset: () => {
    UserState.userModel = undefined;
    UserState.calendars = [];
  },
  logOut: async () => {
    UserState.userModel = undefined;
    UserState.calendars = [];
    localStorage.removeItem("accessToken");
    const result = await get("LogOut");
    if (!result.success) {
      console.log("There was an error attempting to log out");
    }
  },
  refreshToken: async () => {
    const oldToken = localStorage.getItem("accessToken");
    if (oldToken) {
      try {
        const newToken = await GetRefreshedToken(oldToken);
        if (!newToken) {
          console.log("There was an error attempting to refresh token");
          UserState.reset();
        }
        else {
          UserState.setAccessToken(newToken);
        }
      }
      catch (e) {
        console.log("There was an exception attempting to refresh token", e);
        UserState.reset();
      }
    }
  },
  authenticateUser: async (token: string) => {
    const response = await post("AuthenticateUser", { token });
    if (response.success) {
      const userModel = response.value as UserModel;
      UserState.setAccessToken(token);
      UserState.userModel = userModel;
      UserState.updateCalendars();
    }
  },
});


//const tokenRefreshInterval = 1000 * 5; //five seconds 
const tokenRefreshInterval = 1000 * 60 * 5; //five minutes 
window.setInterval(() => {
  if (!UserState.userModel) {
    return;
  }
  if (!document.hidden) {
    UserState.refreshToken();
  }
  else {
    const minutesUntilExpiry = getTokenExpiryTimeInMinutes();
    if (minutesUntilExpiry && minutesUntilExpiry < 15) {
      UserState.refreshToken();
    }
  }
}, tokenRefreshInterval);


window.addEventListener("focus", (event) => {
  const minutesUntilExpiry = getTokenExpiryTimeInMinutes();
  if (!minutesUntilExpiry || minutesUntilExpiry < 0) {
    UserState.reset();
  }
  else if (minutesUntilExpiry && minutesUntilExpiry < 45 && UserState.userModel) {
    UserState.refreshToken();
  }

}, false);


function getTokenExpiryTimeInMinutes() {
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (tokenExpiration) {
    const timeStamp = parseInt(tokenExpiration, 10);
    if (timeStamp) {
      const diff = timeStamp - (new Date().getTime());
      const minutesUntilExpiry = diff / 1000 / 60;
      return minutesUntilExpiry;
    }
  }
}

// let timeout: number | undefined;
// const tokenRefreshInterval = 1000 * 60 * 5; //five minutes
// async function EnsureFreshToken() {
//   if (!timeout) {
//     timeout = window.setTimeout(() => {
//       const tokenExpiration = localStorage.getItem("tokenExpiration");
//       if (tokenExpiration) {
//         const timeStamp = parseInt(tokenExpiration, 10);
//         if (timeStamp) {
//           const diff = timeStamp - (new Date().getTime());
//           const minutesUntilExpiry = diff / 1000 / 60;
//           if (minutesUntilExpiry > 0 && minutesUntilExpiry < 30) {
//             UserState.refreshToken();
//           }
//         }
//       }
//       timeout = undefined;
//     }, tokenRefreshInterval);
//   }
// }




export default UserState;
