import { serieA as teams } from "../../shared/index.ts";
import { Interfaces } from "../../shared/index.ts";
import { getPlaceholder } from "../helpers/getPlaceholder.ts";

const prepareTeamsData = (teamsArray: Interfaces.TeamKey[]) => {
  const myTeams = teams.serieA;

  return teamsArray.map((key) => [myTeams[key].cleanName, myTeams[key].city]);
};

export const teamsQuery = (teamsArray: Interfaces.TeamKey[]) => {
  if (teamsArray.length === 0) return null;

  const data = prepareTeamsData(teamsArray);

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
