import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {GetAllCalendarEvents} from "../DataAccess/calendarDb";
import CalendarEvent from "../Models/CalendarEvent";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    const calendarId = req.query.id;
    const calendarEvents: CalendarEvent[] = await GetAllCalendarEvents(calendarId);

    context.res = {
        headers: {
            "content-type": "application/json; charset=utf-16le",
        },
        body: JSON.stringify(calendarEvents),
    };
};

export default httpTrigger;
