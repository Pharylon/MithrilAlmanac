import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {AddCalendar } from "../DataAccess/calendarDb";
import { CalendarModel} from "../Models/CalendarModel";
import * as uuid from "uuid/v1";
import { VerifyTicket } from "../Security/TokenVerification";
import { GetOrAddUserModelByGoogleId } from "../DataAccess/UserDb";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    const userToken = req.headers.authorization;
    const validateUser = await VerifyTicket(userToken);
    if (!validateUser || !validateUser.userId){
        context.res = {
            status: 400, /* Defaults to 200 */
            body: JSON.stringify({message: "Could not validate token"}),
            headers: {
                "content-type": "application/json; charset=utf-16le",
            },
        };
    }
    const user = await GetOrAddUserModelByGoogleId(validateUser.userId, validateUser.payload);
    const myCalendar = req.body as CalendarModel;
    const id = myCalendar.id ? myCalendar.id : uuid();
    const calendarModel: CalendarModel = {
        ...myCalendar,
        userId: myCalendar.userId ? myCalendar.userId : user.id,
        id,
    };
    await AddCalendar(calendarModel);

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify({id}),
        headers: {
            "content-type": "application/json; charset=utf-16le",
        },
    };
};

export default httpTrigger;
