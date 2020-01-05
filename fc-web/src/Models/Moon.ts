export default interface Moon{
  name: string;
  daysToCycle: number;
  color: string;
  cycleOffset: number;
}

export enum MoonPhase{
  None = "None",
  New = "New",
  Full = "Full",
}

export interface MoonState extends Moon{
  phase: MoonPhase;
}
