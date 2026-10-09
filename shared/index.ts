import { notAString } from "./guards/typeCheckers.ts";
import { emptyData } from "./guards/emptyData.ts";

export const guards = {
  notAString,
  emptyData,
};

export * as serieA from "./dictionaries/serieA.ts";
export * as liga from "./dictionaries/liga.ts";
export * as premier from "./dictionaries/premier.ts";
export * as ligue1 from "./dictionaries/ligue1.ts";
export * as bundesliga from "./dictionaries/bundesliga.ts";

export * from "./constants/atomics.ts";
export * as errors from "./constants/errors.ts";
export * as messages from "./constants/messages.ts";
export * as scopes from "./constants/scopes.ts";
export * from "./helpers.ts";

export type {
  Team as TeamKey,
  SeasonSeeding as SeasonSeed,
  NewMatchSeeding as NewMatchSeed,
  LeaguePropsInterface as LeagueProps,
  TeamDetailsInterface as TeamDetails,
} from "./typings/atomics.ts";
export type {
  MatchInterface as Match,
  AllMatchesType as AllMatches,
  TeamStandingsInterface as TeamStandings,
  StandingsType as Standings,
  RoundsType as Rounds,
  UpdateDataInterface as UpdateData,
  LeagueDataInterface as LeagueData,
} from "./typings/AllMatches.ts";
