import FantasyDate from "./FantasyDate";

export default interface CalendarEvent {
  id: string;
  name: string;
  description: string;
  realDate: Date | undefined;
  fantasyDate: FantasyDate;
}
