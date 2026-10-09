import { guards, errors, scopes, SeasonSeed } from "../../shared/index.ts";
import type {
  GithubSeasonData,
  SingleMatch,
} from "../typings/GithubSeasonData.ts";
import { dictionaryLeagueDefiner } from "./defineLeague.ts";

export const getTeams = (
  seasonData: GithubSeasonData,
  updateData: SeasonSeed,
): string[] | null => {
  const teamsSet = new Set<string>();

  const allMatches = seasonData.matches || [];
  const firstTenMatches = allMatches.filter(
    (match: SingleMatch) => match.round === "Matchday 1",
  );

  const teams = dictionaryLeagueDefiner(updateData.league);
  if (!teams) return null;

  const keys = Object.keys(teams[updateData.league as keyof typeof teams]);

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
