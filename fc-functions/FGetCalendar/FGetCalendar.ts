import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { GetCalendar } from "../DataAccess/CalendarDb";
import { GetUser } from "../Security/GetUser";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    const calendarId = req.query.id;
    context.log("Getting Calendar", calendarId);
    const calendar = await GetCalendar(calendarId);

    function removeShareLink(){
        calendar.shareId = "";
    }

    const user = await GetUser(req.headers.authorization);
    if (!user){
        removeShareLink();
    }
    else{
        const userCalendars = [...user.ownedCalendars, ...user.memberCalendars];
        if (!userCalendars.includes(calendar.id)){
            removeShareLink();
        }
    }

    context.res = {
        headers: {
            "content-type": "application/json; charset=utf-16le",
        },
        body: JSON.stringify(calendar),
    };
};

export default httpTrigger;
