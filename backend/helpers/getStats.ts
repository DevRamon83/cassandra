import {
  getCurrentSeason,
  getNextRound,
  type Match,
  type Rounds,
} from "../../shared";
import { cacheHandler } from "../services/cacheHandler";
import type { TeamsMap } from "../typings/atomics";

const workOnRound = (round: Record<string, Match>, teamsMap: TeamsMap) => {
  const keys = Object.keys(round);
  for (const key of keys) {
    const match = round[key];
    const homeTeam = match.home_team_name;
    const awayTeam = match.away_team_name;
    const teamOne = teamsMap.get(homeTeam)!;
    const teamTwo = teamsMap.get(awayTeam)!;
    const homeScore = match.home_score;
    const awayScore = match.away_score;
    if (homeScore === null || awayScore === null) continue;
    const goal = homeScore > 0 && awayScore > 0;
    const under = homeScore + awayScore < 2.5;
    if (teamOne.home) {
      teamOne.GNG.push(goal);
      teamOne.UO.push(under);
    }

    if (!teamTwo.home) {
      teamTwo.GNG.push(goal);
      teamTwo.UO.push(under);
    }
  }
};

const statsMiner = (rounds: Rounds, gameWeek: number, teamsMap: TeamsMap) => {
  for (const value in rounds) {
    const matchRound = Number(value);
    if (matchRound >= gameWeek) continue;
    const round = rounds[value];
    workOnRound(round, teamsMap);
  }
};

export const getStats = async (
  teamsMap: TeamsMap,
  leagues: string[],
): Promise<{ error: boolean; map: TeamsMap | null }> => {
  const league = leagues[0];
  leagues.shift();
  const season = getCurrentSeason();
  const { error, standings, rounds } = await cacheHandler(league, season);

  if (error || !standings || !rounds) return { error: true, map: null };

  const nextGameWeek = getNextRound(standings);
  const roundToPredict = rounds[nextGameWeek];
  const matchIds = Object.keys(roundToPredict);

  for (const id of matchIds) {
    const homeTeam = roundToPredict[id].home_team_name;
    const awayTeam = roundToPredict[id].away_team_name;
    teamsMap.set(homeTeam, { home: true, GNG: [], UO: [], roundToPredict });
    teamsMap.set(awayTeam, { home: false, GNG: [], UO: [], roundToPredict });
  }

  statsMiner(rounds, nextGameWeek, teamsMap);

  if (leagues.length === 0) {
    return { error: false, map: teamsMap };
  } else {
    return await getStats(teamsMap, leagues);
  }
};
