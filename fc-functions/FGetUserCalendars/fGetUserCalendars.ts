import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { GetUserCalendars } from "../DataAccess/CalendarDb";
import { GetUser } from "../Security/GetUser";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    const user = await GetUser(req.headers.authorization);
    if (!user){
        context.res = {
            status: 401, /* Defaults to 200 */
            body: "Could not authenticate user",
        };    
        return;
    }
    const calendarIds = [...user.ownedCalendars, ...user.memberCalendars];
    if (calendarIds.length === 0){
        context.res = {
            headers: {
                "content-type": "application/json; charset=utf-16le",
            },
            body: JSON.stringify([]),
        };
        return;
    }
    const dtos = await GetUserCalendars(calendarIds);

    context.res = {
        headers: {
            "content-type": "application/json; charset=utf-16le",
        },
        body: JSON.stringify(dtos),
    };
};

export default httpTrigger;
