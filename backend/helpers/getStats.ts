import type { Match, Rounds } from "../../shared";
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

export const getStats = async (league: string, season: string) => {
  const { error, standings, rounds } = await cacheHandler(league, season);

  if (error || !standings || !rounds)
    return { error: true, map: null, roundToPredict: null };

  const teams = Object.keys(standings);
  const nextGameWeek = standings[teams[0]].played + 1;
  const roundToPredict = rounds[nextGameWeek];
  const matchIds = Object.keys(roundToPredict);
  const teamsMap: TeamsMap = new Map();

  for (const id of matchIds) {
    const homeTeam = roundToPredict[id].home_team_name;
    const awayTeam = roundToPredict[id].away_team_name;
    teamsMap.set(homeTeam, { home: true, GNG: [], UO: [] });
    teamsMap.set(awayTeam, { home: false, GNG: [], UO: [] });
  }

  statsMiner(rounds, nextGameWeek, teamsMap);

  return { error: false, map: teamsMap, roundToPredict };
};
