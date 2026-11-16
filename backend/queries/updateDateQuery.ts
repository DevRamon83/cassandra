export const updateDateQuery = (id: number, date: string) => {
  const sqlQuery = `
    UPDATE matches
    SET match_date = $1
    WHERE id = $2
  `;

  return {
    text: sqlQuery,
    values: [date, id],
  };
};
