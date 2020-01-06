import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { VerifyTicket } from "../Security/TokenVerification";
import { GetOrAddUserModelByGoogle, AddCalendarToUser } from "../DataAccess/UserDb";
import { GetCalendar } from "../DataAccess/CalendarDb";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log("HTTP trigger function processed a request for JOIN CALENDAR.");
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
