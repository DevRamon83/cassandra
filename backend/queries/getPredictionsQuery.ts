export const getPredictionsQuery = () => {
  const sqlQuery = `
    SELECT *
    FROM predictions
    ORDER BY id DESC;
  `;

  return {
    text: sqlQuery,
    values: [],
  };
};
