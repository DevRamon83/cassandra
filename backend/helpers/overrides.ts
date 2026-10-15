import {
  errors,
  matchPoints,
  matchResult,
  scopes,
  type TeamDetails,
  totalMatches,
} from "../../shared/index.ts";
import { Status } from "../typings/atomics.ts";

export const validIds = (array: string[], status: Status) => {
  for (const value of array) {
    const parsed = Number(value);
    if (isNaN(parsed) || parsed < 0) {
      status.success = false;
      status.error = scopes.backend.override + errors.invalidId;
      return false;
    }
  }
  return true;
};

export const validScores = (
  homeScore: number,
  awayScore: number,
  status: Status,
) => {
  if (
    typeof homeScore !== "number" ||
    homeScore > 10 ||
    homeScore < 0 ||
    typeof awayScore !== "number" ||
    awayScore > 10 ||
    awayScore < 0
  ) {
    status.error = scopes.backend.override + errors.invalidType;
    status.success = false;
    return false;
  }
  return true;
};

export const validResult = (home: string, away: string, status: Status) => {
  if (!matchResult.includes(home) || !matchResult.includes(away)) {
    status.error = scopes.backend.override + errors.invalidResult;
    status.success = false;
    return false;
  }

  return true;
};

export const validPoints = (home: number, away: number, status: Status) => {
  if (!matchPoints.includes(home) || !matchPoints.includes(away)) {
    status.error = scopes.backend.override + errors.invalidPoints;
    status.success = false;
    return false;
  }

  return true;
};

export const validTeams = (
  team1: string,
  team2: string,
  status: Status,
  dictionary: Record<string, TeamDetails>,
) => {
  const validTeamNames = new Set(
    Object.values(dictionary).map((team) => team.cleanName),
  );

  if (!validTeamNames.has(team1) || !validTeamNames.has(team2)) {
    status.error = scopes.backend.override + errors.invalidTeam;
    status.success = false;
    return false;
  }

  return true;
};

export const validContext = (
  season: string,
  league: string,
  bodySeason: string,
  bodyLeague: string,
  status: Status,
) => {
  if (season !== bodySeason) {
    status.error = scopes.backend.override + errors.invalidSeason;
    status.success = false;
    return false;
  }

  if (league !== bodyLeague) {
    status.error = scopes.backend.override + errors.invalidLeague;
    status.success = false;
    return false;
  }

  return true;
};

export const validGameWeek = (
  gameWeek: number,
  league: string,
  status: Status,
) => {
  const leagueLength = totalMatches(league);
  if (gameWeek < 0 || gameWeek > leagueLength) {
    status.error = scopes.backend.override + errors.invalidGameWeek;
    status.success = false;
    return false;
  }

  return true;
};
