import type { GithubSeasonData } from "../interfaces/GithubSeasonData.ts";
import { Interfaces } from "../../shared/index.ts";
import {
  getAwayHomeTeams,
  getGameWeek,
  getMatchTime,
} from "../helpers/getMatchData.ts";

const prepareMatchesData = (
  seasonData: GithubSeasonData,
  body: Interfaces.SeasonSeed,
  teamsMap: {
    id: string;
    team_name: string;
  }[],
) => {
  const { season, league } = body;
  const matrix = [];

  for (let i = 0; i < seasonData.matches.length; i++) {
    const match = seasonData.matches[i];

    const match_date = getMatchTime(match, league) || null;
    const { home_team_id, away_team_id } = getAwayHomeTeams(
      match,
      league,
      teamsMap,
    );

    if (!home_team_id || !away_team_id) {
      console.error("team missing", match.round);
      return [];
    }

    const game_week = getGameWeek(match);

    if (!game_week) {
      console.error("game_week missing", match.round);

      return [];
    }

    matrix.push([
      league,
      season,
      match_date,
      home_team_id,
      away_team_id,
      game_week,
    ]);
  }
  return matrix;
};

export const matchesQuery = (
  seasonData: GithubSeasonData,
  body: Interfaces.SeasonSeed,
  teamsMap: {
    id: string;
    team_name: string;
  }[],
) => {
  const data = prepareMatchesData(seasonData, body, teamsMap);
  if (data.length === 0) {
    return { error: true, errorMessage: "Match data missing" };
  }

  const placeholders = data
    .map((_, index) => {
      const base = index * 6;
      return `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, $${base + 6})`;
    })
    .join(",\n");

  const sqlQuery = `
INSERT INTO matches (league, season, match_date, home_team_id, away_team_id, game_week) 
VALUES ${placeholders}
`;

  return {
    text: sqlQuery,
    values: data.flat(),
  };
};
