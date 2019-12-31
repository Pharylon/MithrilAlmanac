import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { VerifyTicket } from "../Security/TokenVerification";
import { GetOrAddUserModelByGoogleId } from "../DataAccess/UserDb";
import { GetCalendarEvent, GetCalendar, DeleteItem } from "../DataAccess/calendarDb";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log("Delete Event Triggered");
    const userToken = req.headers.authorization;
    const validateUser = await VerifyTicket(userToken);
    if (!validateUser || !validateUser.userId) {
        context.res = {
            status: 400, /* Defaults to 200 */
            body: JSON.stringify({ message: "Could not validate token" }),
            headers: {
                "content-type": "application/json; charset=utf-16le",
            },
        };
        return;
    }
    const user = await GetOrAddUserModelByGoogleId(validateUser.userId, validateUser.payload);
    const eventId = (req.query.id || (req.body && req.body.id));
    if (eventId) {
        const event = await GetCalendarEvent(eventId);
        const calendar = await GetCalendar(event.calendarId);
        const userCalendars = [...user.ownedCalendars, ...user.memberCalendars];
        if (!userCalendars.includes(calendar.id)) {
            context.res = {
                status: 403,
                body: "You do not have permission to delete that event",
            };
            return;
        }
        await DeleteItem(event);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Success",
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