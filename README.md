# This is the code for the Mithril Almanac

## Demo

The site is here: https://www.mithrilalmanac.com

## Setup

These instructions are for Windows, because that's what I develop on. 

1. Install Node and all that Jazz.

2. You need to create a symbolic link so the fc-functions  and fc-web projects can share models. If you're on Windows, that looks something like this if you've cloned it into the repos folder `mklink /D Models "C:\Users\<username>\source\repos\MithrilAlmanac\fc-web\src\Models"`

3. Install Azure Functions Core Tools. You'll also need an Azure account. I did this using CosmosDB because it seemed like it might be fun to try something different. You'll either need to install the local emulator or just have a MSDN account. Sorry about that!

4. Set up your settings in fc-functions you'll need to add a `local.settings.json` file. It should look like this:
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "endpoint": "https://my-azure-endpoint",
    "key": "myKey",
    "googleClientId": "bunchofNumbers.apps.googleusercontent.com",
    "googleClientSecret": "itsasecret",
    "authenticationRedirectUrl": "http://localhost:3000/authenticate"
  },
  "Host": {
    "CORS": "*"
  }
}
```

5. In fc-web you'll need to create an .env file

```env
    REACT_APP_API_ADDRESS="http://localhost:7071/api/"
    REACT_APP_GOOGLE_CLIENT_ID="same-as-client-id-in-fc-functions"
```

6. Now you should be able to run things. Run `npm i` and `npm run` in both simultaneously.

[![License: CC BY-NC 4.0](https://licensebuttons.net/l/by-nc/4.0/80x15.png)](https://creativecommons.org/licenses/by-nc/4.0/)

© Zachary Shuford 2020