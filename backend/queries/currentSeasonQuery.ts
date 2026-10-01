export const currentSeasonQuery = () => {
  return `SELECT 
    m.*, 
    t_home.team_name AS home_team_name,
    t_away.team_name AS away_team_name
FROM matches m
JOIN teams t_home ON m.home_team_id = t_home.id
JOIN teams t_away ON m.away_team_id = t_away.id
WHERE m.league = $1 
  AND m.season = $2;`;
};
