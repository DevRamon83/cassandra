import { getPlaceholder } from "../helpers/getPlaceholder.ts";
import { OverrideBody } from "../typings/atomics.ts";

const prepareMatchesData = (data: OverrideBody) => {
  const matrix = [];

  const keys = Object.keys(data.matchday);

  for (let i = 0; i < keys.length; i++) {
    const match = data.matchday[keys[i]];

    matrix.push([
      keys[i],
      match.home_team_id,
      match.home_team_name,
      match.home_score,
      match.home_result,
      match.home_points,
      match.away_team_id,
      match.away_team_name,
      match.away_score,
      match.away_result,
      match.away_points,
    ]);
  }
  return matrix;
};

export const overrideQuery = (body: OverrideBody) => {
  const data = prepareMatchesData(body);
  if (data.length === 0) {
    return { error: true, errorMessage: "Match data missing" };
  }

  const placeholders = getPlaceholder(data);

  const sqlQuery = `
UPDATE matches AS m
SET 
  home_score = t.home_score::smallint,
  home_result = t.home_result::match_result,
  home_points = t.home_points::smallint,
  away_score = t.away_score::smallint,
  away_result = t.away_result::match_result,
  away_points = t.away_points::smallint
FROM (
  VALUES ${placeholders}
) AS t(
  match_id, 
  home_team_id, home_team_name, home_score, home_result, home_points, 
  away_team_id, away_team_name, away_score, away_result, away_points
)
WHERE m.id = t.match_id::bigint
  AND EXISTS (
    SELECT 1 FROM teams 
    WHERE teams.id = t.home_team_id::bigint AND teams.team_name = t.home_team_name
  )
  AND EXISTS (
    SELECT 1 FROM teams 
    WHERE teams.id = t.away_team_id::bigint AND teams.team_name = t.away_team_name
  );
`;

  return {
    text: sqlQuery,
    values: data.flat(),
  };
};
