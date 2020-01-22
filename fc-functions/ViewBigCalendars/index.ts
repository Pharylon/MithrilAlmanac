import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { GetCalendarCounts } from "../DataAccess/calendarDb";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log("HTTP trigger function processed a request.");
    const calendarStats = await GetCalendarCounts();
    calendarStats.sort((a, b) => a.count - b.count);

    if (calendarStats && calendarStats.length) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: JSON.stringify(calendarStats),
            headers: {
                "content-type": "application/json; charset=utf-16le",
            },
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
};

export default httpTrigger;
