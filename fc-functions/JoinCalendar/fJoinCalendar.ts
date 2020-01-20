import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { GetCalendar } from "../DataAccess/CalendarDb";
import { GetUser } from "../Security/GetUser";
import { AddCalendarToUser } from "../DataAccess/UserDb";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log("HTTP trigger function processed a request for JOIN CALENDAR.");
    const user = await GetUser(req.headers.authorization);
    if (!user){
        context.res = {
            status: 401, /* Defaults to 200 */
            body: "Could not authenticate user",
        };    
        return;
    }
    const {joinId, calendarId} = req.body as {joinId: string, calendarId: string};
    const calendar = await GetCalendar(calendarId);
    if (calendar.shareId === joinId){
        await AddCalendarToUser(user.googleId, calendar.id, false);   
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Success",
        };    
        return;
    }
    else{
        context.res = {
            status: 404, /* Defaults to 200 */
            body: "That join ID was not valid",
        };    
        return;
    }
};

export default httpTrigger;
