import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { google } from "googleapis";
import oauth2Client from "../Security/OauthClient";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log("HTTP trigger Get Token");
    const code = (req.query.code || (req.body && req.body.code));

    if (code) {
        const {tokens} = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const userInfo = await oauth2Client.getTokenInfo(tokens.access_token);

        context.res = {
            body: JSON.stringify({ token: tokens.id_token }),
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
