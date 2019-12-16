import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {AddCalendar, GetCalendar} from "../DataAccess/calendarDb";
import CalendarModel from "../Models/CalendarModel";
import GreyhawkCalendar from "../Models/GreyhawkCalendar";
import * as uuid from "uuid/v1";

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    // const templateId = Response
    // const allEvents = await GetCalendar();
    // const myCalendar: CalendarModel = {
    //     id: uuid(),
    //     currentYear: 567,
    //     events: allEvents,
    //     ...GreyhawkCalendar,
    // };
    // await AddCalendar(myCalendar);
    

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: "Done!",
    };
};

export default httpTrigger;
