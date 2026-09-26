import { notAString } from "./guards/typeCheckers.ts";
import { emptyData } from "./guards/emptyData.ts";

export const guards = {
  notAString,
  emptyData,
};

export * as serieA from "./dictionaries/serieA.ts";

export * from "./constants/atomics.ts";
export * as errors from "./constants/errors.ts";
export * as scopes from "./constants/scopes.ts";

import type MatchSeedRaw from "./interfaces/MatchSeed.ts";
import type GameWeekRaw from "./interfaces/GameWeek.ts";
import type { Team } from "./interfaces/atomics.ts";

export namespace Interfaces {
  export type MatchSeed = MatchSeedRaw;
  export type GameWeek = GameWeekRaw;
  export type TeamKey = Team;
}
