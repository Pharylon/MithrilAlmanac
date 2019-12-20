import EarthCalendar from "./EarthCalendar";
import GreyhawkCalendar from "./GreyhawkCalendar";
import ExandriaCalendar from "./ExandriaCalendar";
import TorilCalendar from "./TorilCalendar";

const CalendarTemplates = [
  {id: "toril", longName: "Toril (Forgotten Realms)", value: TorilCalendar},
  {id: "exandria", longName: "Exandria (Critical Role)", value: ExandriaCalendar},
  {id: "oerth", longName: "Oerth (Greyhawk)", value: GreyhawkCalendar},
  {id: "earth", longName: "Earth (The Real World)", value: EarthCalendar},
];

export {CalendarTemplates};
export {EarthCalendar};
export {ExandriaCalendar};
export {TorilCalendar};
