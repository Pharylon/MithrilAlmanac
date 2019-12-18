import { AzureFunction, Context, HttpRequest } from "@azure/functions";

// tslint:disable-next-line:only-arrow-functions
const httpTrigger: AzureFunction = async function(context: Context, req: HttpRequest): Promise<void> {
    context.log("HTTP trigger function processed a request.");
    const name: string = (req.query.name || (req.body && req.body.name));

    const processIs = JSON.stringify(process.env.foo);
    

    if (name) {
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: "Hello " + (req.query.name || req.body.name),
        };
    }
    else {
        context.res = {
            status: 400,
            body: processIs,
        };
    }
};

export default httpTrigger;