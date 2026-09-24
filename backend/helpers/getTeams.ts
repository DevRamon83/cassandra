import type GithubSeasonData from "../interfaces/GithubSeasonData.ts";

export const getTeams = (seasonData: GithubSeasonData): string[] => {
  const teamsSet = new Set<string>();

  const allMatches = seasonData.matches || [];

  const firstTenMatches = allMatches.slice(0, 10);

  for (const match of firstTenMatches) {
    if (match.team1) teamsSet.add(match.team1);
    if (match.team2) teamsSet.add(match.team2);
  }

  return Array.from(teamsSet);
};
