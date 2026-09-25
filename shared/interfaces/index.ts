import type MatchSeedRaw from "./MatchSeed.ts";
import type GameWeekRaw from "./gameWeek.ts";
import type { Team } from "./atomics.ts";

export namespace Interfaces {
  export type MatchSeed = MatchSeedRaw;
  export type GameWeek = GameWeekRaw;
  export type TeamKey = Team;
}
