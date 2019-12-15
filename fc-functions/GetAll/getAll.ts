import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {GetAllCalendarEvents} from "../DataAccess/calendarEventDataAccess";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    context.log("GET ALL Triggered");
    const results = await GetAllCalendarEvents();
    context.res = {
        headers: {
            "content-type": "application/json; charset=utf-16le",
        },
        body: JSON.stringify(results),
    };
};

export default httpTrigger;
