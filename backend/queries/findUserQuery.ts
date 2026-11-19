export const findUserQuery = (username: string) => {
  const sqlQuery = `
    SELECT 
      u.id,
      u.username,
      u.psw,
      b.id AS bankroll_id,
      b.initial_budget::FLOAT,
      b.current_budget::FLOAT,
      b.season
    FROM users u
    LEFT JOIN bankroll b ON b.user_id = u.id
    WHERE u.username = $1;
  `;

  return {
    text: sqlQuery,
    value: [username],
  };
};
