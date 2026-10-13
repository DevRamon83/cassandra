export const findUserQuery = (username: string) => {
  const sqlQuery = `
    SELECT * 
FROM users 
WHERE username = $1;
    `;

  return {
    text: sqlQuery,
    value: [username],
  };
};
