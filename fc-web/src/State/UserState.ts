import {observable} from "mobx";

interface IUserState {
  loginModalOpen: boolean;
  accessToken: string;
}
const UserState = observable<IUserState>({
  loginModalOpen: false,
  accessToken: "",
});


export default UserState;
