import type { GithubSeasonData } from "../typings/GithubSeasonData.ts";
import { SeasonSeed } from "../../shared/index.ts";
import {
  getAwayHomeTeams,
  getGameWeek,
  getScores,
  getResults,
  getMatchTime,
  getPoints,
} from "../helpers/getMatchData.ts";
import { getPlaceholder } from "../helpers/getPlaceholder.ts";
import { matchesArray } from "../../shared/index.ts";
import { getUpdateCondition } from "../helpers/queriesConditions.ts";

const prepareMatchesData = (
  seasonData: GithubSeasonData,
  updateData: SeasonSeed,
  teamsMap: {
    id: string;
    team_name: string;
  }[],
) => {
  const { season, league } = updateData;
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

    const { home_score, away_score } = getScores(match);
    const { home_result, away_result } = getResults(home_score, away_score);
    const { home_points, away_points } = getPoints(home_result, away_result);

    matrix.push([
      league,
      season,
      match_date,
      home_team_id,
      away_team_id,
      home_score,
      home_result,
      home_points,
      away_score,
      away_result,
      away_points,
      game_week,
    ]);
  }
  return matrix;
};

export const matchesQuery = (
  seasonData: GithubSeasonData,
  updateData: SeasonSeed,
  teamsMap: {
    id: string;
    team_name: string;
  }[],
) => {
  const data = prepareMatchesData(seasonData, updateData, teamsMap);

  if (data.length === 0) {
    return { error: true, errorMessage: "Match data missing" };
  }

  const placeholders = getPlaceholder(data);

  const sqlQuery = `
INSERT INTO matches (${matchesArray.join(", ")}) 
VALUES ${placeholders}
ON CONFLICT (season, game_week, home_team_id) 
DO UPDATE SET
  ${getUpdateCondition("matches", "league")},

  ${getUpdateCondition("matches", "match_date")},

  ${getUpdateCondition("matches", "home_score")},
 
  ${getUpdateCondition("matches", "home_result")},

  ${getUpdateCondition("matches", "home_points")},

  ${getUpdateCondition("matches", "away_score")},

  ${getUpdateCondition("matches", "away_result")},

  ${getUpdateCondition("matches", "away_points")};
`;

  return {
    text: sqlQuery,
    values: data.flat(),
  };
};
