import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import CalendarEvent from "../Models/CalendarEvent";
import { UpdateEvent} from "../DataAccess/calendarDb";
import * as uuid from "uuid/v1";
import { VerifyTicket } from "../Security/TokenVerification";

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
    const newEvent: CalendarEvent = {
        id: req.body.id ? req.body.id : uuid(),
        calendarId: req.body.calendarId,
        name: req.body.name,
        description: req.body.description,
        realDate: req.body.realDate,
        fantasyDate: req.body.fantasyDate,
    };
    if (!newEvent.name || !newEvent.fantasyDate || !newEvent.id || !newEvent.calendarId){
        context.res = {
            status: 400,
            body: "Missing some of the expected parameters for a calendar events",
        };
        return;
    }
    try {
        const addedEvent = await UpdateEvent(newEvent);
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


