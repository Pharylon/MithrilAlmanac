import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { VerifyTicket } from "../Security/TokenVerification";
import { GetOrAddUserModelByGoogle, updateUser } from "../DataAccess/UserDb";
import { DeleteCalendar } from "../DataAccess/CalendarDb";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log("DELETE Calendar Triggered");
    const userToken = req.headers.authorization;
    const validateUser = await VerifyTicket(userToken);
    if (!validateUser || !validateUser.userId) {
        context.res = {
            status: 401, /* Defaults to 200 */
            body: JSON.stringify({ message: "Could not validate token" }),
            headers: {
                "content-type": "application/json; charset=utf-16le",
            },
        };
        return;
    }
    const user = await GetOrAddUserModelByGoogle(validateUser.userId, validateUser.payload.email);
    const calendarId = (req.query.id || (req.body && req.body.id));
    if (user) {
        if (!user.ownedCalendars.includes(calendarId)) {
            context.res = {
                status: 403,
                body: "You do not have permission to delete that calendar",
            };
            return;
        }
        await DeleteCalendar(calendarId);
        user.ownedCalendars = user.ownedCalendars.filter(x => x !== calendarId);
        await updateUser(user);
        if (calendarId) {
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: "Success",
            };
        }
        else {
            context.res = {
                status: 400,
                body: "Missing Calendar ID",
            };
        }
    }
    else {
        context.res = {
            status: 400,
            body: "Could not authenticate user",
        };
    }
};

export default httpTrigger;
