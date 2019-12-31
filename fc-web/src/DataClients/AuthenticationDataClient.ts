import { post, get } from "./fetchHelper";
import { UserModel } from "../Models/UserModel";
import UserState from "../State/UserState";

export async function GetToken(code: string): Promise<string> {
  const response = await post("GetToken", {code});
  if (response.success){
    const responseObj = response.value as {token: string};
    return responseObj.token;
  }
  return "";
}

export async function AuthenticateUser(token: string): Promise<void> {
  const response = await post("AuthenticateUser", {token});
  if (response.success){
    const userModel = response.value as UserModel;
    UserState.setAccessToken(token);
    UserState.userName = userModel.userName;
    UserState.updateCalendars();
  }
}


export async function GetConsentPage(): Promise<string | undefined> {
  const response = await get("ConsentPage");
  if (response.success){
    const responseModel = response.value as {url: string};
    if (responseModel.url){
      return responseModel.url;
    }
  }
  return undefined;
}


