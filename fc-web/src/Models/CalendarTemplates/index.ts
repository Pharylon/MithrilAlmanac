/* cSpell:disable */
import EarthCalendar from "./EarthCalendar";
import GreyhawkCalendar from "./GreyhawkCalendar";
import ExandriaCalendar from "./ExandriaCalendar";
import TorilCalendar from "./TorilCalendar";
import EberronCalendar from "./KhorvaireCalendar";

const CalendarTemplates = [
  {id: "oerth", longName: "Oerth (Greyhawk)", value: GreyhawkCalendar},
  {id: "toril", longName: "Toril (Forgotten Realms)", value: TorilCalendar},
  {id: "exandria", longName: "Exandria (Critical Role)", value: ExandriaCalendar},
  {id: "eberron", longName: "Khorvaire (Eberron)", value: EberronCalendar},
  {id: "earth", longName: "Earth (The Real World)", value: EarthCalendar},
];

export {CalendarTemplates};
export {EarthCalendar};
export {ExandriaCalendar};
export {TorilCalendar};
