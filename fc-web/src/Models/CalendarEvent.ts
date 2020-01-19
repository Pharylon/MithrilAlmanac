import FantasyDate from "./FantasyDate";

export default interface CalendarEvent {
  id: string;
  calendarId: string;
  name: string;
  description: string;
  realDate: Date | undefined;
  fantasyDate: FantasyDate;
  hidden: boolean;
  createUser: string;
}

export function sortEvents(events: CalendarEvent[]): CalendarEvent[]{
  const newArray = Array.from(events);
  newArray.sort((a, b) => {
    if (a.fantasyDate.year !== b.fantasyDate.year) {
      return a.fantasyDate.year - b.fantasyDate.year;
    }
    else if (a.fantasyDate.month !== b.fantasyDate.month) {
      return a.fantasyDate.month - b.fantasyDate.month;
    }
    else {
      return a.fantasyDate.dayOfMonth - b.fantasyDate.dayOfMonth;
    }
  });
  return newArray;
}
