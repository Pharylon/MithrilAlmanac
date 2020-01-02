import UserState from "../State/UserState";
const baseUriAddress = getBaseAddress();

export interface ErrorObject {
  status: number;
  message: string;
  errors?: string[];
}

export interface Result {
  success: boolean;
  value: unknown | ErrorObject;
}

export async function get(uri: string, parameters?: any): Promise<Result> {
  const fullUri = getUri(baseUriAddress + uri, parameters);
  const requestInit: RequestInit = {
    method: "GET",
    headers: getHeaders(false),
  };
  const response = await request(fullUri, requestInit);
  return response;
}

export async function post(uri: string, body: any): Promise<Result> {
  const fullUri = getUri(baseUriAddress + uri);
  const requestInit: RequestInit = {
    method: "POST",
    body: JSON.stringify(body),
    headers: getHeaders(!!body),
  };
  const response = await request(fullUri, requestInit);
  return response;
}

async function request(uri: string, requestInit: RequestInit): Promise<Result> {
  EnsureFreshToken();
  const response = await fetch(uri, requestInit);
  if (response.status === 200) {
    if (isJson(response)) {
      try {
        const responseObj = await response.json();
        ConvertDateTimes(responseObj);
        return {
          success: true,
          value: responseObj,
        };
      }
      catch (err) {
        const myErr: ErrorObject = {
          message: "ERR 1: Something went wrong parsing the Response JSON",
          status: response.status,
        };
        return {
          success: false,
          value: myErr,
        };
      }
    }
    else {
      return {
        success: true,
        value: undefined,
      };
    }
  }
  if (response.status === 401) {
    UserState.timeout();
    const errorObj = await getErrorObject(response);
    console.log("Unauthorized", errorObj);
    return {
      success: false,
      value: errorObj,
    };
    
  }
  else {
    console.log("Get the error obj", response);
    const errorObj = await getErrorObject(response);
    return {
      success: false,
      value: errorObj,
    };
  }
}


function getUri(url: string, params?: any) {
  let myUri = url;
  if (params) {
    const queryParams = Object.keys(params)
      .filter((key) => {
        return typeof (params[key]) !== "undefined" && params[key] !== null;
      })
      .map((key) => {
        let value = params[key];
        if (Object.prototype.toString.call(value) === "[object Date]") {
          value = value.toISOString();
        }
        else {
          value = encodeURIComponent(value);
        }
        return encodeURIComponent(key) + "=" + value;
      });
    const queryString = queryParams.join("&");
    myUri = myUri + "?" + queryString;
  }
  return myUri;
}

function isJson(response: any) {
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return true;
  }
  return false;
}

async function getErrorObject(response: Response): Promise<ErrorObject> {
  const contentType = response.headers.get("content-type");
  const errorObj: ErrorObject = {
    message: getUnknownErrorMsg(response.status),
    status: response.status,
  };
  if (contentType && contentType.includes("application/json")) {
    try {
      const json = await response.json();
      errorObj.message = json.message;
      if (json.errors) {
        errorObj.errors = json.errors;
      }
    }
    catch (err) {
      console.log("There was an exception parsing the error object", response, err);
    }
  }
  return errorObj;
}

function getUnknownErrorMsg(status: number) {
  if (status === 401) {
    return "There was an unknown error with your request. Please make sure you are logged in.";
  }
  else {
    return "There was an unknown error with your request. Status code: " + status;
  }
}

function getBaseAddress() {
  let baseAddress = process.env.REACT_APP_API_ADDRESS;
  if (!baseAddress) {
    console.log("YOU MUST ADD THE FUNCTION BASE ADDRESS TO THE ENV FILE!");
  }
  else if (!baseAddress.endsWith("/")) {
    baseAddress += "/";
  }
  return baseAddress;
}

function getHeaders(hasBody: boolean): Headers {
  const headers: HeadersInit = new Headers();
  headers.set("Accept", "application/json");
  if (hasBody) {
    headers.set("Content-Type", "application/json");
  }
  const token = UserState.getAccessToken();
  if (token) {
    headers.set("Authorization", token);
  }
  return headers;
}


let timeout: number | undefined;
const tokenRefreshInterval = 1000 * 60 * 5; //five minutes
async function EnsureFreshToken() {
  if (!timeout) {
    timeout = window.setTimeout(() => {
      const tokenExpiration = localStorage.getItem("tokenExpiration");
      if (tokenExpiration) {
        const timeStamp = parseInt(tokenExpiration, 10);
        if (timeStamp) {
          const diff = timeStamp - (new Date().getTime());
          const minutesUntilExpiry = diff / 1000 / 60;
          if (minutesUntilExpiry > 0 && minutesUntilExpiry < 30) {
            UserState.refreshToken();
          }
        }
      }
      timeout = undefined;
    }, tokenRefreshInterval);
  }
}

function ConvertDateTimes(obj: any){
  if (obj.realDate){
    if (typeof(obj.realDate) === "string"){
      obj.realDate = new Date(obj.realDate);
    }
  }
  if (Array.isArray(obj)){
    obj.forEach(x => ConvertDateTimes(x));
  }
}
