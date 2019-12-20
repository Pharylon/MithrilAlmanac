import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {AddCalendar } from "../DataAccess/calendarDb";
import {CalendarModel, CalendarTemplate} from "../Models/CalendarModel";
import * as uuid from "uuid/v1";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    // const myCalendar = req.body as CalendarTemplate;
    // const calendarModel = {
    //     ...myCalendar,
    //     id: uuid(),
    // };
    // await AddCalendar(calendarModel);
    const id = uuid();

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: JSON.stringify({id}),
    };
};

export default httpTrigger;
