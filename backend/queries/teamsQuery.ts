import { teams } from "../../shared/index.ts";
import { Interfaces } from "../../shared/index.ts";

const prepareTeamsData = (teamsArray: Interfaces.TeamKey[]) => {
  const myTeams = teams.teamsData;
  return teamsArray.map((key) => [myTeams[key].cleanName, myTeams[key].city]);
};

export const teamsQuery = (teamsArray: Interfaces.TeamKey[]) => {
  if (teamsArray.length === 0) return null;

  const data = prepareTeamsData(teamsArray);

  const placeholders = data
    .map((_, index) => `($${index * 2 + 1}, $${index * 2 + 2})`)
    .join(", ");

  const sqlQuery = `
    INSERT INTO teams (team_name, city) 
    VALUES ${placeholders}
    ON CONFLICT (team_name) DO NOTHING
    RETURNING *;
  `;

  return {
    text: sqlQuery,
    values: data.flat(),
  };
};
