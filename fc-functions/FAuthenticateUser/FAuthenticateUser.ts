import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {GetOrAddUserModelByGoogle} from "../DataAccess/UserDb";
import { VerifyTicket } from "../Security/TokenVerification";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {

    const token = req.body.token;

    const validatedTicket = await VerifyTicket(token);
    if (!validatedTicket || !validatedTicket.userId){
        context.res = {
            status: 401, /* Defaults to 200 */
            body: JSON.stringify({message: "Could not validate token"}),
            headers: {
                "content-type": "application/json; charset=utf-16le",
            },
        };
        return;
    }

    const userModel = await GetOrAddUserModelByGoogle(validatedTicket.userId, validatedTicket.payload.email);

    context.res = {
        headers: {
            "content-type": "application/json; charset=utf-16le",
        },
        body: JSON.stringify(userModel),
    };
};

export default httpTrigger;
