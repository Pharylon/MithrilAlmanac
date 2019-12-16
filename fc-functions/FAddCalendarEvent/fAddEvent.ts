import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import CalendarEvent from "../Models/CalendarEvent";
import {AddEvent} from "../DataAccess/calendarDb";
import * as uuid from "uuid/v1";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    const body = JSON.parse(req.body);
    const newEvent: CalendarEvent = {
        id: body.id ? body.id : uuid(),
        calendarId: body.calendarId,
        name: body.name,
        description: body.description,
        realDate: body.realDate,
        fantasyDate: body.fantasyDate,
    };
    if (!newEvent.name || !newEvent.fantasyDate){
        context.res = {
            status: 400,
            body: "Missing some of the expected parameters for a calendar events",
        };
        return;
    }
    try {
        const addedEvent = await AddEvent(newEvent);
        context.res = {
            body: addedEvent,
        };
    }
    catch {
        context.res = {
            status: 400,
            body: "Something went wrong with your request",
        };
    }
};

export default httpTrigger;


