import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { GetCalendarEvent, GetCalendar, DeleteEvent } from "../DataAccess/CalendarDb";
import { GetUser } from "../Security/GetUser";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log("Delete Event Triggered");
    const user = await GetUser(req.headers.authorization);
    if (!user){
        context.res = {
            status: 401, /* Defaults to 200 */
            body: "Could not authenticate user",
        };    
        return;
    }
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
        await DeleteEvent(event);
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
