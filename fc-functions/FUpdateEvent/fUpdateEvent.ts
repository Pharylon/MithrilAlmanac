import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import CalendarEvent from "../Models/CalendarEvent";
import CalendarEventEditModel from "../Models/CalendarEventEditModel";
import { UpdateEvent, GetCalendarEvent, GetCalendar, SaveCalendar} from "../DataAccess/CalendarDb";
import * as uuid from "uuid/v1";
import { GetUser } from "../Security/GetUser";
import { CalendarModel } from "../Models/CalendarModel";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    const user = await GetUser(req.headers.authorization);
    if (!user){
        context.res = {
            status: 401, /* Defaults to 200 */
            body: "Could not authenticate user",
        };    
        return;
    }
    const calendars = [...user.ownedCalendars, ...user.memberCalendars];
    const newEvent: CalendarEvent = {
        id: req.body.id ? req.body.calendarEvent.id : uuid(),
        calendarId: req.body.calendarEvent.calendarId,
        name: req.body.calendarEvent.name,
        description: req.body.calendarEvent.description,
        realDate: req.body.calendarEvent.realDate,
        fantasyDate: req.body.calendarEvent.fantasyDate,
        hidden: req.body.calendarEvent.hidden,
        createUser: req.body.calendarEvent.createUser,
    };
    if (req.body.calendarEvent.id){
        const existing = await GetCalendarEvent(req.body.calendarEvent.id);
        if (existing){
            if (existing.createUser && existing.createUser !== newEvent.createUser){
                context.res = {
                    status: 400,
                    body: "You may not alter the CreateUser of the calendar event",
                };
                return;
            }
            if (newEvent.hidden !== existing.hidden && existing.createUser && existing.createUser !== user.id){
                context.res = {
                    status: 400,
                    body: "You may not change the visibility of this event",
                };
                return;
            }
        }        
    }
    if (!calendars.includes(newEvent.calendarId)){
        context.res = {
            status: 401, /* Defaults to 200 */
            body: JSON.stringify({message: "You do not have permission to add events to this calendar."}),
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
        if (req.body.makeCurrentDate) {
            var existingCalendar = await GetCalendar(newEvent.calendarId);
            var updateCalendarModel: CalendarModel = {
                ...existingCalendar,
                currentDate: newEvent.fantasyDate,                
            }
            await SaveCalendar(updateCalendarModel);
        }
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


