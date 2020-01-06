import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {SaveCalendar, GetCalendar } from "../DataAccess/CalendarDb";
import { CalendarModel} from "../Models/CalendarModel";
import * as uuid from "uuid/v1";
import { VerifyTicket } from "../Security/TokenVerification";
import { GetOrAddUserModelByGoogle, AddCalendarToUser } from "../DataAccess/UserDb";

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
    const user = await GetOrAddUserModelByGoogle(validateUser.userId, validateUser.payload.email);
    const myCalendar = req.body as CalendarModel;
    if (myCalendar.id){
        const userOwnedCalendars = [...user.memberCalendars, ...user.ownedCalendars];
        if (!userOwnedCalendars.includes(myCalendar.id)){
            context.res = {
                status: 403,
                body: "You do not have permission to modify that calendar",
            };
            return;
        }
    }
    const id = myCalendar.id ? myCalendar.id : uuid();
    const calendarModel: CalendarModel = {
        ...myCalendar,
        id,
    };
    await SaveCalendar(calendarModel);
    await AddCalendarToUser(validateUser.userId, calendarModel.id, true);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify({id}),
        headers: {
            "content-type": "application/json; charset=utf-16le",
        },
    };
};

export default httpTrigger;
