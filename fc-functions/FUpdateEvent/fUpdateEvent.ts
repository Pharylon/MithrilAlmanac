import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import CalendarEvent from "../Models/CalendarEvent";
import { UpdateEvent} from "../DataAccess/calendarDb";
import * as uuid from "uuid/v1";
import { VerifyTicket } from "../Security/TokenVerification";
import { GetOrAddUserModelByGoogle } from "../DataAccess/UserDb";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    const userToken = req.headers.authorization;
    const validatedToken = await VerifyTicket(userToken);
    if (!validatedToken || !validatedToken.userId){
        context.res = {
            status: 401, /* Defaults to 200 */
            body: JSON.stringify({message: "Could not validate your credentials. Please make sure you are logged in."}),
            headers: {
                "content-type": "application/json; charset=utf-16le",
            },
        };
        return;
    }
    const user = await GetOrAddUserModelByGoogle(validatedToken.userId, validatedToken.payload.email);
    const calendars = [...user.ownedCalendars, ...user.memberCalendars];
    const newEvent: CalendarEvent = {
        id: req.body.id ? req.body.id : uuid(),
        calendarId: req.body.calendarId,
        name: req.body.name,
        description: req.body.description,
        realDate: req.body.realDate,
        fantasyDate: req.body.fantasyDate,
    };
    if (!calendars.includes(newEvent.calendarId)){
        context.res = {
            status: 401, /* Defaults to 200 */
            body: JSON.stringify({message: "You do not have permission to add vents to this calendar."}),
            headers: {
                "content-type": "application/json; charset=utf-16le",
            },
        };
        return;
    }
    if (!newEvent.name || !newEvent.fantasyDate || !newEvent.id || !newEvent.calendarId){
        context.res = {
            status: 400,
            body: "Missing some of the expected parameters for a calendar events.",
        };
        return;
    }
    try {
        const addedEvent = await UpdateEvent(newEvent);
        context.res = {
            body: JSON.stringify(addedEvent),
            headers: {
                "content-type": "application/json; charset=utf-16le",
            },
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


