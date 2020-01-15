import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {GetAllCalendarEvents} from "../DataAccess/CalendarDb";
import CalendarEvent from "../Models/CalendarEvent";
import { GetUser } from "../Security/GetUser";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    const user = await GetUser(req.headers.authorization);
    
    const calendarId = req.query.id;
    const calendarEvents: CalendarEvent[] = await GetAllCalendarEvents(calendarId);

    const visibleEvents = calendarEvents.filter(x => !x.hidden || (user && x.createUser === user.id));

    context.res = {
        headers: {
            "content-type": "application/json; charset=utf-16le",
        },
        body: JSON.stringify(visibleEvents),
    };
};

export default httpTrigger;
