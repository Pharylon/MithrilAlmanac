export default interface FantasyDate{
  year: number;
  month: number;
  dayOfMonth: number;
}

export function datesAreEqual(date1: FantasyDate, date2: FantasyDate){
  return (date1.dayOfMonth === date2.dayOfMonth) &&
   (date1.month === date2.month) &&
   (date1.year === date2.year);
}
