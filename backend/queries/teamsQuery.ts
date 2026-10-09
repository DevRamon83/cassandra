import type { TeamDetails, TeamKey } from "../../shared/index.ts";
import { dictionaryLeagueDefiner } from "../helpers/defineLeague.ts";
import { getPlaceholder } from "../helpers/getPlaceholder.ts";

const prepareTeamsData = (teamsArray: TeamKey[], league: string) => {
  const teams = dictionaryLeagueDefiner(league);
  if (!teams) return null;
  const myTeams = teams[league as keyof typeof teams] as Record<
    string,
    TeamDetails
  >;

  return teamsArray.map((key) => [myTeams[key].cleanName, myTeams[key].city]);
};

export const teamsQuery = (teamsArray: TeamKey[], league: string) => {
  if (teamsArray.length === 0) return null;

  const data = prepareTeamsData(teamsArray, league);
  if (!data) return null;

  const placeholders = getPlaceholder(data);

  const sqlQuery = `
INSERT INTO teams (team_name, city) 
VALUES ${placeholders}
ON CONFLICT (team_name) DO NOTHING;
`;

  return {
    text: sqlQuery,
    values: data.flat(),
  };
};

export const teamsTable = "SELECT id, team_name FROM teams";
