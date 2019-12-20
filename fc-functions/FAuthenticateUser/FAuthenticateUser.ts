import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {GetOrAddUserModelByGoogleId} from "../DataAccess/UserDb";
import { VerifyTicket } from "../Security/TokenVerification";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {

    const token = req.body.token;

    const result = await VerifyTicket(token);

    const userModel = await GetOrAddUserModelByGoogleId(result.userId, result.payload);

    context.res = {
        headers: {
            "content-type": "application/json; charset=utf-16le",
        },
        body: JSON.stringify(userModel),
    };
};

export default httpTrigger;
