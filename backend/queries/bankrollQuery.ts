interface Data {
  user_id: string;
  current_budget: number;
  initial_budget: number;
  season: string;
}

export const bankrollQuery = (data: Data) => {
  const sqlQuery = `
    INSERT INTO bankroll (user_id, current_budget, initial_budget, season)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  return {
    text: sqlQuery,
    values: [
      data.user_id,
      data.current_budget,
      data.initial_budget,
      data.season,
    ],
  };
};
