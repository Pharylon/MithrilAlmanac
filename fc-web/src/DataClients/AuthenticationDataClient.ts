import { post, get } from "./fetchHelper";

export async function GetToken(code: string): Promise<string> {
  const response = await post("GetToken", {code});
  if (response.success){
    const responseObj = response.value as {token: string, expiration: number};
    if (responseObj.expiration){
      localStorage.setItem("tokenExpiration", responseObj.expiration.toString());
    }    
    return responseObj.token;
  }
  return "";
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


