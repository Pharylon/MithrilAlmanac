export default function chunks<T>(arr: T[], n: number): T[][] {

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
