import type { SingleMatch } from "../interfaces/GithubSeasonData.ts";
import { getTeamsOfLeague } from "./getTeams.ts";
import { DateTime } from "luxon";

const getZone = (league: string) => {
  switch (league) {
    case "serieA":
      return "Europe/Rome";

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

  const team1Name = teams.serieA[match.team1].cleanName;
  const team2Name = teams.serieA[match.team2].cleanName;

  const home_team_id = map.get(team1Name);
  const away_team_id = map.get(team2Name);

  return { home_team_id, away_team_id };
};

export const getGameWeek = (match: SingleMatch) => {
  const matchDay = match.round.replace("Matchday ", "");
  return parseInt(matchDay);
};
