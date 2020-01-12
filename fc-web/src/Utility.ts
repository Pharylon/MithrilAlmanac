export function chunks<T>(arr: T[], n: number): T[][] {

  const start: T[][] = [];

  const result = arr.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / n);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new chunk
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, start);

  return result;
}

export function clone<T>(object: T): T {
  const json = JSON.stringify(object);
  const clonedOjb = JSON.parse(json) as T;
  return clonedOjb;
}

export function getCalendarNumber(num: number): string {
  if (num <= 7){
    return "seven";
  }
  if (num === 8){
    return "eight";
  }
  if (num === 9){
    return "nine";
  }
  if (num === 10){
    return "ten";
  }
  return "seven";
}

export function getInternetExplorerVersion()
{
  let rv = -1;
  if (navigator.appName === "Microsoft Internet Explorer")
  {
    const ua = navigator.userAgent;
    const re = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");
    if (re.exec(ua) != null){
      rv = parseFloat( RegExp.$1 );
    }
      
  }
  else if (navigator.appName === "Netscape")
  {
    const ua = navigator.userAgent;
    const re  = new RegExp("Trident/.*rv:([0-9]{1,}[\\.0-9]{0,})");
    if (re.exec(ua) != null)
      {
        rv = parseFloat( RegExp.$1 );
      }
  }
  return rv;
}
