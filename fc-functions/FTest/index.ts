import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import CreationTime from "../DataAccess/CreateTime";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    // const name = (req.query.name || (req.body && req.body.name));
    // const googleClientId = process.env.googleClientId;

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: CreationTime,
    };
};

export default httpTrigger;
