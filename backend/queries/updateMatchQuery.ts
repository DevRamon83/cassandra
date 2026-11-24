interface DataInterface {
  id: number;
  home_score: number;
  home_result: string;
  home_points: number;
  away_score: number;
  away_result: string;
  away_points: number;
}

export const updateMatchQuery = (body: DataInterface, outcomes: string[]) => {
  const { id, ...data } = body;
  const keys = Object.keys(data);

  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const idParamIndex = keys.length + 1;
  const outcomesParamIndex = keys.length + 2;

  const sqlQuery = `
    WITH updated_match AS (
      UPDATE matches
      SET ${setClause}
      WHERE id = $${idParamIndex}
      RETURNING id
    )
    UPDATE items
    SET won = (prediction::text = ANY($${outcomesParamIndex}::text[]))
    WHERE match_id = (SELECT id FROM updated_match)
      AND won IS NULL;
  `;

  return {
    text: sqlQuery,
    values: [...Object.values(data), id, outcomes],
  };
};
