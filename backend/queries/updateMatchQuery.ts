interface DataInterface {
  id: number;
  home_score: number;
  home_result: string;
  home_points: number;
  away_score: number;
  away_result: string;
  away_points: number;
}

export const updateMatchQuery = (body: DataInterface) => {
  const { id, ...data } = body;
  const keys = Object.keys(data);

  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const sqlQuery = `
    UPDATE matches
    SET ${setClause}
    WHERE id = $${keys.length + 1}
  `;

  return {
    text: sqlQuery,
    values: [...Object.values(data), id],
  };
};
