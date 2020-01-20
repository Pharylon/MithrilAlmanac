import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import getOauth2Client from "../Security/OauthClient";
import { GetOrAddUserModelByGoogle, updateUser } from "../DataAccess/UserDb";
import { VerifyTicket } from "../Security/TokenVerification";
import { GetTokenOptions } from "google-auth-library";
import { GoogleTokens } from "../Models/UserModel";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log("HTTP trigger Get Token");
    const code = (req.query.code || (req.body && req.body.code));
    const token = (req.query.token || (req.body && req.body.token));

    const oauth2Client = getOauth2Client();
    if (code) {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        // const userInfo = await oauth2Client.getTokenInfo(tokens.access_token);

        const ticket = await VerifyTicket(tokens.id_token);

        if (tokens.access_token) {
            const userModel = await GetOrAddUserModelByGoogle(ticket.userId, ticket.payload.email, tokens);
            if (!userModel){
                context.res = {
                    status: 401,
                    body: "Could not get user model from code",
                };
                return;
            }
            const existingToken = userModel.googleTokens ? userModel.googleTokens.refreshToken : "";
            userModel.googleTokens = {
                refreshToken: tokens.refresh_token || existingToken,
                accessToken: tokens.access_token,
            };
            await updateUser(userModel);
        }

        //const newClient = getOauth2Client();
        // newClient.setCredentials({
        //     refresh_token: tokens.refresh_token,
        //     access_token: tokens.access_token,
        //     token_type: tokens.token_type,
        //     id_token: tokens.id_token,
        // });
        //const result = await newClient.revokeCredentials();

        //const result = await oauth2Client.revokeCredentials();

        context.res = {
            body: JSON.stringify({ 
                token: tokens.id_token,
                expiration: tokens.expiry_date,
             }),
            headers: {
                "content-type": "application/json; charset=utf-16le",
            },
        };
    }
    else if (token) {
        const verifiedTicket = await VerifyTicket(req.headers.authorization);
        const user = await GetOrAddUserModelByGoogle(verifiedTicket.userId, verifiedTicket.payload.email);
        if (!user){
            context.res = {
                status: 401,
                body: "Could not get user model from token",
            };
            return;
        }
        oauth2Client.setCredentials({
            refresh_token: user.googleTokens.refreshToken,
        });
        const response = await oauth2Client.refreshAccessToken();
        user.googleTokens = {
            accessToken: response.credentials.access_token,
            refreshToken: response.credentials.refresh_token || user.googleTokens.refreshToken,
        };
        updateUser(user);
        context.res = {
            body: JSON.stringify(
                { 
                    token: response.credentials.id_token, 
                    expiration: response.credentials.expiry_date,
                }),
            headers: {
                "content-type": "application/json; charset=utf-16le",
            },
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body",
        };
    }
};

export default httpTrigger;
