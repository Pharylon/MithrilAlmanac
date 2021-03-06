export default interface Moon {
  name: string;
  daysToCycle: number;
  color: string;
  cycleOffset: number;
}

export enum MoonPhase {
  None = "None",
  New = "New",
  Full = "Full",
}

export interface MoonState extends Moon {
  phase: MoonPhase;
}

function getMoonStateInternal(moon: Moon, previousDays: number): MoonState {
  function getMoonFullPercentage(cycles: number) {
    let myPct = cycles % 1;
    if (myPct < .5) {
      myPct = 1 - myPct;
    }
    return myPct;
  }

  const cyclesSinceFirstFullMoon = previousDays / moon.daysToCycle;
  const moonFullPercentage = getMoonFullPercentage(cyclesSinceFirstFullMoon);
  const sliceSize = 1 / moon.daysToCycle;
  const fullThreshold = 1 - (sliceSize / 2);
  let phase = MoonPhase.None;

  if (previousDays < 0){
    phase = MoonPhase.None;
  }
  else if (previousDays === moon.cycleOffset){
    phase = MoonPhase.Full;
  }
  else if (moonFullPercentage > fullThreshold) {
    phase = MoonPhase.Full;
  }
  else if (Math.abs(.50001 - moonFullPercentage) <= sliceSize / 2) {
    phase = MoonPhase.New;
  }
  const newMoonModal = {
    ...moon,
    phase,
  };
  return newMoonModal;
}

export function GetMoonState(moon: Moon, previousDays: number): MoonState {
  const state = getMoonStateInternal(moon, previousDays);
  if (state.phase === MoonPhase.New || state.phase === MoonPhase.Full){
    const prevDayState = getMoonStateInternal(moon, previousDays - 1);
    if (prevDayState.phase === state.phase){
      return {
        ...state,
        phase: MoonPhase.None,
      };
    }
  }
  return state;
}
