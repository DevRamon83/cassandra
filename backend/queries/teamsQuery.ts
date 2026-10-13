import { dictionaryLeagueDefiner } from "../helpers/defineLeague.ts";
import { getPlaceholder } from "../helpers/getPlaceholder.ts";

const prepareTeamsData = (teamsArray: string[], league: string) => {
  const teams = dictionaryLeagueDefiner(league);
  if (!teams) return null;

  return teamsArray.map((key) => [teams[key].cleanName, teams[key].city]);
};

export const teamsQuery = (teamsArray: string[], league: string) => {
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
