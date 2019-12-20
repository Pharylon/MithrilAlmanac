import {observable} from "mobx";

interface IUserState {
  loginModalOpen: boolean;
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;
  userName: string;
}


const UserState = observable<IUserState>({
  loginModalOpen: false,
  getAccessToken: () => localStorage.getItem("accessToken"),
  setAccessToken: (token: string) => localStorage.setItem("accessToken", token),
  userName: "",
});



export default UserState;
