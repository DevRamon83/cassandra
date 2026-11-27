import { leagues } from "../../../shared";
import type { Match } from "../../../shared";
import type { PredictionDB, PredictionUI } from "../typings/interfaces";

export const getPredictionsData = (
  leaguesContext: Record<string, any>,
  predictions: PredictionDB[],
) => {
  const cacheMap = new Map<string, Match>();
  const predictionContext: PredictionUI[] = [];

  for (const league of leagues) {
    const rounds = leaguesContext[league].rounds;
    const weekIds = Object.keys(rounds);

    weekIds.forEach((id: string) => {
      const gameWeek = rounds[id];
      const matchKeys = Object.keys(gameWeek);

      matchKeys.forEach((matchId: string) => {
        cacheMap.set(matchId, gameWeek[matchId]);
      });
    });
  }

  for (const prediction of predictions) {
    const match = cacheMap.get(prediction.match_id);
    if (!match) continue;

    const matchData = {
      match: `${match.home_team_name} vs ${match.away_team_name}`,
      league: match.league,
      gameWeek: match.game_week,
      date: match.match_date,
    };
    predictionContext.push({ ...prediction, ...matchData });
  }
  return predictionContext;
};
