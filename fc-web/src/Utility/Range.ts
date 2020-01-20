export function CreateRange(a: number, b: number): number[] {
  const myArray = [a];
  while (myArray[myArray.length - 1] < b){
    const newNumber = myArray[myArray.length - 1] + 1;
    myArray.push(newNumber);
  }
  return myArray;
}
