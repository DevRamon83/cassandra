import {
  getCurrentSeason,
  getNextRound,
  leagues,
  type Match,
} from "../../shared";
import { cacheHandler } from "../services/cacheHandler";
import type { predictionDB, PredictionMatrix } from "../typings/atomics";
import { getMatchOutcomes } from "./getMatchData";

const getOutcome = (
  matchID: string,
  leaguesMap: Map<(typeof leagues)[number], Record<string, Match>>,
) => {
  let match: Match | null = null;

  for (const league of leagues) {
    if (match) break;
    const round = leaguesMap.get(league);
    if (!round) break;
    match = round[matchID];
  }

  if (!match) return null;

  const outcomesArray = getMatchOutcomes(match);

  return outcomesArray;
};

export const getPredictionsMatrix = async (predictions: predictionDB[]) => {
  const season = getCurrentSeason();
  const leaguesMap = new Map();
  const matrix: PredictionMatrix = [];
  let error = false;

  for (const league of leagues) {
    const { rounds, standings } = await cacheHandler(league, season);
    if (!standings) {
      console.error("missing standings for: ", league);
      continue;
    }
    const round = getNextRound(standings) - 1;
    const currentRound = rounds[round];
    leaguesMap.set(league, currentRound);
  }

  for (const prediction of predictions) {
    const matchId = prediction.match_id;
    const outcomes = getOutcome(matchId, leaguesMap);
    if (!outcomes) {
      error = true;
      break;
    }
    const myPrediction = prediction.prediction ?? "";
    const isGuessed = outcomes?.includes(myPrediction);

    matrix.push([isGuessed, prediction.id]);
  }

  return error ? null : matrix;
};
