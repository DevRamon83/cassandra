import type { Match } from "../../../shared";
import type { PredictionUI, StatsCounts } from "../typings/interfaces";

const gameWeekOutcomes = (
  round: Record<string, Match>,
  stats: StatsCounts,
  tolerance: number,
) => {
  let g = 0;
  let ng = 0;
  let u = 0;
  let o = 0;
  let homeWin = 0;
  let awayWin = 0;
  let draw = 0;
  let gameWeek = null;
  for (const match of Object.values(round)) {
    const { home_score, away_score, home_result } = match;
    if (home_score === null || away_score === null) continue;
    gameWeek = gameWeek ? gameWeek : match.game_week;

    if (home_result === "w") {
      homeWin += 1;
    } else if (home_result === "l") {
      awayWin += 1;
    } else {
      draw += 1;
    }
    if (home_score === 0 || away_score === 0) {
      stats.noGoal++;
      ng += 1;
    } else {
      stats.goal++;
      g += 1;
    }

    if (home_score + away_score < 2.5) {
      stats.under++;
      u += 1;
    } else {
      stats.over++;
      o += 1;
    }
  }

  if (!gameWeek) return;
  const howManyMatch = Object.keys(round).length;
  const checkValue = howManyMatch - tolerance;

  const addAnomaly = (outcome: string) => {
    if (!stats.allSame) return;

    stats.allSame.outcomes.push(outcome);
    stats.allSame.gameWeeks.push(gameWeek);
  };

  if (g === checkValue) addAnomaly("goal");
  if (ng === checkValue) addAnomaly("noGoal");
  if (u === checkValue) addAnomaly("under");
  if (o === checkValue) addAnomaly("over");

  if (homeWin === checkValue) addAnomaly("1");
  if (awayWin === checkValue) addAnomaly("2");
  if (draw === checkValue) addAnomaly("X");
};

const definePercentages = (stats: StatsCounts) => {
  const playedMatches = stats.goal + stats.noGoal;
  const goalPC = Math.round((stats.goal / playedMatches) * 100);
  const noGoalPC = 100 - goalPC;
  const underPC = Math.round((stats.under / playedMatches) * 100);
  const overPC = 100 - underPC;

  return {
    goal: goalPC,
    under: underPC,
    noGoal: noGoalPC,
    over: overPC,
    allSame: stats.allSame,
  };
};

export const workOnLeague = (
  rounds: Record<string, Record<string, Match>>,
  tolerance: number,
) => {
  const stats: StatsCounts = {
    goal: 0,
    noGoal: 0,
    under: 0,
    over: 0,
    allSame: { gameWeeks: [], outcomes: [] },
  };

  for (const round of Object.values(rounds)) {
    gameWeekOutcomes(round, stats, tolerance);
  }

  return definePercentages(stats);
};

export const wonPercentage = (won: number, length: number) => {
  return Math.round((won / length) * 100);
};

export const workOnTeam = (
  rounds: Record<string, Record<string, Match>>,
  team: string,
  nextRound: number,
) => {
  const home: Match[] = [];
  const away: Match[] = [];
  const all: Match[] = [];
  let currentRound = 1;

  while (currentRound < nextRound) {
    const myRound = rounds[currentRound.toString()];
    const roundKeys = Object.keys(myRound);
    roundKeys.forEach((key) => {
      const match = myRound[key];
      const { home_team_name, away_team_name } = match;
      const isMine = home_team_name === team || away_team_name === team;
      if (isMine) {
        away_team_name === team ? away.push(match) : home.push(match);
        all.push(match);
      }
    });
    currentRound += 1;
  }

  return { home, away, all };
};

const tailConverter = (tail: string) => {
  if (tail === "all") return 0;
  if (tail === "three") return 3;
  return 5;
};

export const dataTeam = (array: Match[], tail: string, view: string) => {
  const stats: StatsCounts = {
    goal: 0,
    noGoal: 0,
    under: 0,
    over: 0,
  };
  if (view === "overview") return stats;

  const length = tailConverter(tail);
  const matches = length === 0 ? array : array.slice(-length);

  for (const match of matches) {
    const obj = { 1: match };
    gameWeekOutcomes(obj, stats, 0);
  }

  return definePercentages(stats);
};

export const matchFinder = (round: Record<string, Match>, team: string) => {
  const matches = Object.values(round);
  for (const match of matches) {
    if (match.away_team_name === team || match.home_team_name === team)
      return match;
  }
  return null;
};

export const getPredictionRatio = (predictions: PredictionUI[]) => {
  const total = predictions.length;
  const won = predictions.filter((prediction) => prediction.prediction_result);
  const winRate = (won.length / total) * 100;

  return { total, winRate };
};

export const predictionsHistory = (
  predictions: PredictionUI[],
  league: string,
  homeTeam: string,
  awayTeam: string,
) => {
  const homePredictions = [];
  const awayPredictions = [];

  const leaguePredictions = predictions.filter(
    (prediction) =>
      prediction.league === league && prediction.prediction_result !== null,
  );

  for (const prediction of leaguePredictions) {
    const isMyHomeTeam = prediction.match.includes(homeTeam);
    const isMyAwayTeam = prediction.match.includes(awayTeam);
    isMyHomeTeam && homePredictions.push(prediction);
    isMyAwayTeam && awayPredictions.push(prediction);
  }

  return { homePredictions, awayPredictions };
};
