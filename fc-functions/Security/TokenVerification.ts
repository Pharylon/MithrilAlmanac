import { OAuth2Client } from "google-auth-library";
import { UserModel } from "../Models/UserModel";
import { TokenPayload } from "google-auth-library/build/src/auth/loginticket";
import oauth2Client from "./OauthClient";


interface GoogleTokenResult {
  payload: TokenPayload;
  userId: string;
}

interface TokenCacheObj {
  date: Date;
  model: GoogleTokenResult;
}

const client = new OAuth2Client(process.env.googleClientId);

const cache: Map<string, TokenCacheObj> = new Map();

export async function VerifyTicket(token: string) {
  if (!token){
    return undefined;
  }
  const cached = getModelFromCache(token);
  if (cached){
    return cached;
  }
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.googleClientId,  // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const userId = payload.sub;
  // If request specified a G Suite domain:
  //const domain = payload['hd'];
  return {
    payload,
    userId,
  };
}

export async function VerifyToken(token: string) {
  if (!token){
    return undefined;
  }
  const cached = getModelFromCache(token);
  if (cached){
    return cached;
  }
  const userInfo = await oauth2Client.getTokenInfo(token);
  const asAny = userInfo as any;
  return {
    googleId: userInfo.sub,
    email: asAny.email,
  };
}

export async function RemoveTicketFromCache(token: string){
  cache.delete(token);
}

function getModelFromCache(token: string): GoogleTokenResult | undefined{
  if (cache.has(token)){
    const now = new Date();
    const cached = cache.get(token);
    const millisecondDiff = cached.date.getTime() - now.getTime();
    if (millisecondDiff > 30000){
      cache.delete(token);
      return undefined;
    }
    return cached.model;
  }
}
