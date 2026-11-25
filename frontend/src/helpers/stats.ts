import type { Match } from "../../../shared";
import type { StatsCounts } from "../typings/interfaces";

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

export const wonPercentage = (won: number, length: number) => {
  return Math.round((won / length) * 100);
};
