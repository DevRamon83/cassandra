export const getPredictionsToUpdateQuery = () => {
  const sqlQuery = `
    SELECT *
    FROM predictions
    WHERE prediction_result IS NULL
    ORDER BY id DESC;
  `;

  return {
    text: sqlQuery,
    values: [],
  };
};
