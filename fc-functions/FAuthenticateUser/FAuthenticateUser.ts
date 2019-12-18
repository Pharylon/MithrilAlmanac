import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { OAuth2Client } from "google-auth-library";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {

    const token = req.body.token;
    const client = new OAuth2Client(process.env.googleClientId);


    async function verify() {
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

    const result = await verify();

    context.res = {
        headers: {
            "content-type": "application/json; charset=utf-16le",
        },
        body: JSON.stringify(result),
    };
};

export default httpTrigger;
