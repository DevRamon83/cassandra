import { guards, errors, scopes, Interfaces } from "../../shared/index.ts";
import type { GithubSeasonData } from "../interfaces/GithubSeasonData.ts";
import { serieA } from "../../shared/index.ts";

export const getTeamsOfLeague = (league: string) => {
  switch (league) {
    case "serieA":
      return serieA;

    default:
      return null;
  }
};

export const getTeams = (
  seasonData: GithubSeasonData,
  body: Interfaces.SeasonSeed,
): string[] | null => {
  const teamsSet = new Set<string>();

  const allMatches = seasonData.matches || [];

  const firstTenMatches = allMatches.slice(0, 10);
  const teams = getTeamsOfLeague(body.league);

  if (!teams) return null;

  const keys = Object.keys(teams.serieA);

  for (const match of firstTenMatches) {
    if (guards.notAString(match.team1, errors.seasonSeeding)) return null;

    if (guards.notAString(match.team2, errors.seasonSeeding)) return null;

    if (!keys.includes(match.team1)) {
      console.error(
        `${scopes.backend.getTeams}: ${match.team1} ${errors.invalidTeam}`,
      );
      return null;
    }

    if (!keys.includes(match.team2)) {
      console.error(
        `${scopes.backend.getTeams}: ${match.team2} ${errors.invalidTeam}`,
      );
      return null;
    }

    teamsSet.add(match.team1);
    teamsSet.add(match.team2);
  }

  return Array.from(teamsSet);
};
