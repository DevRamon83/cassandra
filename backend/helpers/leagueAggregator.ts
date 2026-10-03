import {
  AllMatches,
  Match,
  Rounds,
  Standings,
  updateData,
} from "../../shared/index.ts";

const haveRound = (obj: Rounds, round: number): boolean => round in obj;

const addMatch = (obj: Rounds, round: number, exist: boolean, match: Match) => {
  if (exist) {
    obj[round][match.id] = match;
  } else {
    obj[round] = {
      [match.id]: match,
    };
  }
};

const standingsBlueprint = {
  played: 0,
  w: 0,
  l: 0,
  d: 0,
  scored: 0,
  conceded: 0,
  gd: 0,
  points: 0,
};

const updateStandings = (match: Match, standings: Standings) => {
  const homeExist = standings[match.home_team_name];
  const awayExist = standings[match.away_team_name];

  if (!homeExist) {
    standings[match.home_team_name] = { ...standingsBlueprint };
  }

  if (!awayExist) {
    standings[match.away_team_name] = { ...standingsBlueprint };
  }
};

const updatePlayed = (data: updateData) => {
  const { homeTeam, awayTeam, standings } = data;
  standings[homeTeam].played += 1;
  standings[awayTeam].played += 1;
};

const updatePoints = (data: updateData) => {
  const { homeTeam, awayTeam, standings, match } = data;

  if (match.home_points === null || match.away_points === null) return;

  standings[homeTeam].points += match.home_points;
  standings[awayTeam].points += match.away_points;
};

const resultHandler = (result: string, standings: Standings, team: string) => {
  switch (result) {
    case "w":
      standings[team].w += 1;
      break;
    case "d":
      standings[team].d += 1;
      break;
    case "l":
      standings[team].l += 1;
      break;
    default:
      break;
  }
};

const updateResult = (data: updateData) => {
  const { homeTeam, awayTeam, standings, match } = data;

  if (!match.home_result || !match.away_result) return;
  resultHandler(match.home_result, standings, homeTeam);
  resultHandler(match.away_result, standings, awayTeam);
};

const updateGoals = (data: updateData) => {
  const { homeTeam, awayTeam, standings, match } = data;
  if (match.away_score === null || match.home_score === null) return;
  standings[homeTeam].scored += match.home_score;
  standings[homeTeam].conceded += match.away_score;
  standings[awayTeam].scored += match.away_score;
  standings[awayTeam].conceded += match.home_score;
  standings[homeTeam].gd += match.home_score - match.away_score;
  standings[awayTeam].gd += match.away_score - match.home_score;
};

export const leagueAggregator = (data: AllMatches) => {
  const rounds: Rounds = {};
  const standings: Standings = {};
  for (const match of data) {
    const round = match.game_week;
    const roundExist = haveRound(rounds, round);
    addMatch(rounds, round, roundExist, match);

    updateStandings(match, standings);

    const homeTeam = match.home_team_name;
    const awayTeam = match.away_team_name;

    // match has not yet been played
    if (match.away_points === null) {
      continue;
    }

    const updateData = { homeTeam, awayTeam, standings, match };
    updatePlayed(updateData);
    updateResult(updateData);
    updateGoals(updateData);
    updatePoints(updateData);
  }

  return { rounds, standings };
};
