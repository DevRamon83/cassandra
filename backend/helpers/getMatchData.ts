import type { Match } from "../../shared/index.ts";
import type { SingleMatch } from "../typings/GithubSeasonData.ts";
import { dictionaryLeagueDefiner } from "./defineLeague.ts";
import { DateTime } from "luxon";

const getZone = (league: string) => {
  switch (league) {
    case "serieA":
      return "Europe/Rome";
    case "liga":
      return "Europe/Madrid";
    case "premier":
      return "Europe/London";
    case "ligue1":
      return "Europe/Paris";
    case "bundesliga":
      return "Europe/Berlin";
    default:
      return "UTC";
  }
};

export const getMatchTime = (match: SingleMatch, league: string) => {
  const date = match.date;
  const time = match.time;
  const zone = getZone(league);

  const dt = DateTime.fromISO(`${date}T${time}`, { zone: zone });

  return dt.toISO();
};

export const getUpdatedMatchTime = (isoDateTime: string) => {
  const dt = DateTime.fromISO(isoDateTime, { zone: "Europe/Rome" });

  return dt.toUTC().toISO();
};

export const getAwayHomeTeams = (
  match: SingleMatch,
  league: string,
  teamsMap: {
    id: string;
    team_name: string;
  }[],
) => {
  const map = new Map(teamsMap.map((team) => [team.team_name, team.id]));
  const teams = dictionaryLeagueDefiner(league);

  if (!teams) return { home_team_id: null, away_team_id: null };

  const team1Name = teams[match.team1]?.cleanName;
  const team2Name = teams[match.team2]?.cleanName;

  const home_team_id = team1Name ? map.get(team1Name) : null;
  const away_team_id = team2Name ? map.get(team2Name) : null;

  return { home_team_id, away_team_id };
};

export const getGameWeek = (match: SingleMatch) => {
  const matchDay = match.round.replace("Matchday ", "");
  const parsed = parseInt(matchDay, 10);

  return Number.isNaN(parsed) ? null : parsed;
};

export const getScores = (match: SingleMatch) => {
  if (!match.score) return { home_score: null, away_score: null };

  const rawScore = match.score;

  if (Array.isArray(rawScore)) {
    return {
      home_score: Number.isNaN(rawScore[0]) ? null : rawScore[0],
      away_score: Number.isNaN(rawScore[1]) ? null : rawScore[1],
    };
  }

  return {
    home_score: Number.isNaN(match.score.ft[0]) ? null : match.score.ft[0],
    away_score: Number.isNaN(match.score.ft[1]) ? null : match.score.ft[1],
  };
};

const defineResult = (team1: number, team2: number) => {
  if (team1 === team2) return "d";
  if (team1 > team2) return "w";
  return "l";
};

export const getResults = (home: number | null, away: number | null) => {
  if (home === null || away === null)
    return { home_result: null, away_result: null };

  const home_result = defineResult(home, away);
  const away_result = defineResult(away, home);
  return {
    home_result,
    away_result,
  };
};

const definePoints = (result: string | null) => {
  if (result === null) return null;
  if (result === "d") return 1;
  if (result === "w") return 3;
  return 0;
};

export const getPoints = (home: string | null, away: string | null) => {
  const home_points = definePoints(home);
  const away_points = definePoints(away);

  return { home_points, away_points };
};

export const getMatchOutcomes = (match: Match) => {
  const outcomes = [];
  const { home_result, home_score, away_score } = match;
  const invalidScore = home_score === null || away_score === null;
  if (invalidScore || !home_result) return null;

  if (home_result === "w") outcomes.push("1");
  if (home_result === "d") outcomes.push("x");
  if (home_result === "l") outcomes.push("2");

  if (home_score + away_score > 2.5) {
    outcomes.push("over");
  } else {
    outcomes.push("under");
  }

  if (!home_score || !away_score) {
    outcomes.push("no_goal");
  } else {
    outcomes.push("goal");
  }

  return outcomes;
};
