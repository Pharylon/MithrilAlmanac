import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { VerifyTicket } from "../Security/TokenVerification";
import { GetOrAddUserModelByGoogle, updateUser } from "../DataAccess/UserDb";
import getOauth2Client from "../Security/OauthClient";
import {UserCache} from "../DataAccess/Caching";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        context.log("HTTP trigger function processed a request.");
        const validatedToken = await VerifyTicket(req.headers.authorization);
        if (!validatedToken || !validatedToken.userId) {
            context.res = {
                status: 401, /* Defaults to 200 */
                body: JSON.stringify({ message: "Could not validate token" }),
                headers: {
                    "content-type": "application/json; charset=utf-16le",
                },
            };
            return;
        }
        const user = await GetOrAddUserModelByGoogle(validatedToken.userId, validatedToken.payload.email);
        if (user.googleTokens && user.googleTokens.accessToken) {
            const oauthClient = getOauth2Client();
            oauthClient.setCredentials({
                refresh_token: user.googleTokens.refreshToken,
                access_token: user.googleTokens.accessToken,
                // token_type: "Bearer",
                // id_token: req.headers.authorization,
            });
            // oauthClient.on("tokens", (tokens) => {
            //     context.log(tokens);
            // });
            // const foo = await oauthClient.verifyIdToken({
            //     idToken: req.headers.authorization,
            //     audience: process.env.googleClientId,
            // });
            //const tokenInfo = await oauthClient.getTokenInfo(user.googleTokens.accessToken);
            const result = await oauthClient.revokeCredentials();
            //const result = await oauthClient.revokeCredentials();
            user.googleTokens = undefined;
            await updateUser(user);
            UserCache.del(user.googleId);
            if (result.status === 200) {
                context.res = {
                    // status: 200, /* Defaults to 200 */
                    body: "Success",
                };
                return;
            }
        }
        else {
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: "Success, no tokens to log out",
            };
        }
    }
    catch (e) {
        context.res = {
            status: 500,
            body: "Could not log out",
        };
    }

};

export default httpTrigger;
