export const getMyBetsQuery = (userID: string) => {
  const sqlQuery = `
SELECT
  b.*,
  i.match_id,
  i.odds,
  i.prediction,
  i.won AS item_won,
  ht.team_name AS home_team_name,
  at.team_name AS away_team_name
FROM bets b
JOIN items i ON i.bet_id = b.id
JOIN matches m ON m.id = i.match_id
JOIN teams ht ON ht.id = m.home_team_id
JOIN teams at ON at.id = m.away_team_id
WHERE b.user_id = $1
ORDER BY b.id DESC, i.id ASC;
  `;

  return {
    text: sqlQuery,
    values: [userID],
  };
};
