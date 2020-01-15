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


