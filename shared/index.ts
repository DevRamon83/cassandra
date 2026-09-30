import { notAString } from "./guards/typeCheckers.ts";
import { emptyData } from "./guards/emptyData.ts";

export const guards = {
  notAString,
  emptyData,
};

export * as serieA from "./dictionaries/serieA.ts";

export * from "./constants/atomics.ts";
export * as errors from "./constants/errors.ts";
export * as messages from "./constants/messages.ts";
export * as scopes from "./constants/scopes.ts";

import type MatchSeedRaw from "./typings/MatchSeed.ts";
import type {
  Team,
  SeasonSeeding,
  NewMatchSeeding,
} from "./typings/atomics.ts";

export namespace Interfaces {
  export type MatchSeed = MatchSeedRaw;
  export type TeamKey = Team;
  export type SeasonSeed = SeasonSeeding;
  export type NewMatchSeed = NewMatchSeeding;
}
