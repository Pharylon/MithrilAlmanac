import {observable} from "mobx";

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
}


const UserState = observable<IUserState>({
  loginModalOpen: false,
  getAccessToken: () => localStorage.getItem("accessToken"),
  setAccessToken: (token: string) => localStorage.setItem("accessToken", token),
  userName: "",
  calendars: [
    {
      name: "Greyhawk",
      id: "gh",
    },
    {
      name: "Toril",
      id: "toril",
    },
  ],
});



export default UserState;
