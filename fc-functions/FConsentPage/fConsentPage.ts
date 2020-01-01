import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import getOath2Client from "../Security/OauthClient";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log("Consent");

    const oauth2Client = getOath2Client();
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
    });

    context.res = {
        body: JSON.stringify({ url }),
        headers: {
            "content-type": "application/json; charset=utf-16le",
        },
    };
};

export default httpTrigger;
