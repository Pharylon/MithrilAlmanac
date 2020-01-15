import { UserModel } from "../Models/UserModel";
import { VerifyTicket } from "./TokenVerification";
import { GetOrAddUserModelByGoogle } from "../DataAccess/UserDb";

export async function GetUser(authorizationHeader: string): Promise<UserModel | undefined>{
  try{
    if (!authorizationHeader){
      return undefined;
    }
    const validatedToken = await VerifyTicket(authorizationHeader);
    if (!validatedToken || !validatedToken.userId){
      return undefined;
    }
    const user = await GetOrAddUserModelByGoogle(validatedToken.userId, validatedToken.payload.email);
    return user;
  }
  catch {
    return undefined;
  }
}
