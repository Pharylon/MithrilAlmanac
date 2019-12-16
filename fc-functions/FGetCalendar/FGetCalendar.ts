import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { GetCalendar } from "../DataAccess/calendarDb";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    const calendarId = req.query.id;
    const calendar = await GetCalendar(calendarId);

    context.res = {
        headers: {
            "content-type": "application/json; charset=utf-16le",
        },
        body: JSON.stringify(calendar),
    };
};

export default httpTrigger;
