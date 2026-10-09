import type { TeamDetails } from "../../shared/index.ts";
import type { SingleMatch } from "../typings/GithubSeasonData.ts";
import { getTeamsOfLeague } from "./getTeams.ts";
import { DateTime } from "luxon";

const getZone = (league: string) => {
  switch (league) {
    case "serieA":
      return "Europe/Rome";
    case "liga":
      return "Europe/Madrid";
    default:
      break;
  }
};

export const getMatchTime = (match: SingleMatch, league: string) => {
  const date = match.date;
  const time = match.time;
  const zone = getZone(league);

  const dt = DateTime.fromISO(`${date}T${time}`, { zone: zone });

  return dt.toISO();
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
  const teams = getTeamsOfLeague(league);

  if (!teams) return { home_team_id: null, away_team_id: null };

  const myTeams = teams[league as keyof typeof teams] as Record<
    string,
    TeamDetails
  >;

  const team1Name = myTeams[match.team1].cleanName;
  const team2Name = myTeams[match.team2].cleanName;

  const home_team_id = map.get(team1Name);
  const away_team_id = map.get(team2Name);

  return { home_team_id, away_team_id };
};

export const getGameWeek = (match: SingleMatch) => {
  const matchDay = match.round.replace("Matchday ", "");
  return parseInt(matchDay);
};

export const getScores = (match: SingleMatch) => {
  if (!match.score) return { home_score: null, away_score: null };

  const rawScore = match.score as unknown;

  if (Array.isArray(rawScore)) {
    return {
      home_score: rawScore[0],
      away_score: rawScore[1],
    };
  }

  const home_score = match.score.ft[0];
  const away_score = match.score.ft[1];

  return {
    home_score,
    away_score,
  };
};

const defineHomeResult = (home: number, away: number) => {
  if (home === away) return "d";
  if (home > away) return "w";
  return "l";
};

const defineAwayResult = (homeResult: string) => {
  if (homeResult === "d") return "d";
  if (homeResult === "w") return "l";
  return "w";
};

export const getResults = (home: number | null, away: number | null) => {
  if (home === null || away === null)
    return { home_result: null, away_result: null };

  const home_result = defineHomeResult(home, away);
  const away_result = defineAwayResult(home_result);
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
