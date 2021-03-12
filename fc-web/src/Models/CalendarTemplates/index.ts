/* cSpell:disable */
import EarthCalendar from "./EarthCalendar";
import GreyhawkCalendar from "./GreyhawkCalendar";
import ExandriaCalendar from "./ExandriaCalendar";
import TorilCalendar from "./TorilCalendar";
import EberronCalendar from "./KhorvaireCalendar";
import GenericCalendar from "./GenericCalendar";

const CalendarTemplates = [
  {id: "oerth", longName: "Oerth (Greyhawk)", value: GreyhawkCalendar},
  {id: "toril", longName: "Toril (Forgotten Realms)", value: TorilCalendar},
  {id: "exandria", longName: "Exandria (Critical Role)", value: ExandriaCalendar},
  {id: "eberron", longName: "Khorvaire (Eberron)", value: EberronCalendar},
  {id: "earth", longName: "Earth (The Real World)", value: EarthCalendar},
  {id: "generic", longName: "Generic (Placeholders)", value: GenericCalendar},
];

export {CalendarTemplates};
export {EarthCalendar};
export {ExandriaCalendar};
export {TorilCalendar};
export {GenericCalendar};
