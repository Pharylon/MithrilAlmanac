import { google } from "googleapis";

function getOauth2Client(){
  const oauth2Client = new google.auth.OAuth2(
    process.env.googleClientId,
    process.env.googleClientSecret,
    process.env.authenticationRedirectUrl,
  );
  return oauth2Client;
}



export default getOauth2Client;
