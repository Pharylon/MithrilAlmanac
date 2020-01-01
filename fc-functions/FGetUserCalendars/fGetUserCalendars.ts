import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { VerifyTicket } from "../Security/TokenVerification";
import { GetOrAddUserModelByGoogle } from "../DataAccess/UserDb";
import { GetUserCalendars } from "../DataAccess/calendarDb";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    const userToken = req.headers.authorization;
    const validateUser = await VerifyTicket(userToken);
    if (!validateUser || !validateUser.userId){
        context.res = {
            status: 401, /* Defaults to 200 */
            body: JSON.stringify({message: "Could not validate token"}),
            headers: {
                "content-type": "application/json; charset=utf-16le",
            },
        };
        return;
    }
    const user = await GetOrAddUserModelByGoogle(validateUser.userId, validateUser.payload.email);
    const calendarIds = [...user.ownedCalendars, ...user.memberCalendars];
    const dtos = await GetUserCalendars(calendarIds);

    context.res = {
        headers: {
            "content-type": "application/json; charset=utf-16le",
        },
        body: JSON.stringify(dtos),
    };
};

export default httpTrigger;
