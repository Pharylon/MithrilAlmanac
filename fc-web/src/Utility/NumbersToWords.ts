const lowMap = new Map<number, string>();
lowMap.set(1, "zero");
lowMap.set(1, "one");
lowMap.set(2, "two");
lowMap.set(3, "three");
lowMap.set(4, "four");
lowMap.set(5, "five");
lowMap.set(6, "six");
lowMap.set(7, "seven");
lowMap.set(8, "eight");
lowMap.set(9, "nine");
lowMap.set(10, "ten");
lowMap.set(11, "eleven");
lowMap.set(12, "twelve");
lowMap.set(13, "thirteen");
lowMap.set(14, "fourteen");
lowMap.set(15, "fifteen");
lowMap.set(16, "sixteen");
lowMap.set(17, "seventeen");
lowMap.set(18, "eighteen");
lowMap.set(19, "nineteen");

const tensMap = new Map<number, string>();
tensMap.set(2, "twenty");
tensMap.set(3, "thirty");
tensMap.set(4, "forty");
tensMap.set(5, "fifty");
tensMap.set(6, "sixty");
tensMap.set(7, "seventy");
tensMap.set(8, "eighty");
tensMap.set(9, "ninety");

export function NumbersToWords(num: number): string{
  if (num.toString().includes(".")){
    throw new Error("Numbers with Decimal places not supported");
  }
  let myString = "";
  if (lowMap.has(num)){
    myString = lowMap.get(num) as string;
  }
  else{
    const finalDigit = num % 10;
    const tens = finalDigit - finalDigit;
    myString = tensMap.get(tens) as string;
    if (finalDigit){
      myString += (" " + lowMap.get(finalDigit));
    }    
  }
  const capitalized = myString[0].toUpperCase() + myString.slice(1);
  return capitalized;
}
