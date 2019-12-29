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