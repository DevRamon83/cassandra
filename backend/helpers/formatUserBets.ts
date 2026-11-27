import type { SingleBet } from "../../shared";

export const formatUserBets = (rows: any[]): SingleBet[] => {
  const grouped: Record<string, SingleBet> = {};

  for (const row of rows) {
    const betId = String(row.id);

    if (!grouped[betId]) {
      grouped[betId] = {
        betId,
        bonus: Number(row.bonus),
        stake: Number(row.stake),
        season: row.season,
        won: row.won,
        items: [],
      };
    }

    grouped[betId].items.push({
      matchId: String(row.match_id),
      odds: Number(row.odds),
      outcome: row.prediction,
      won: row.item_won,
      match: `${row.home_team_name} vs ${row.away_team_name}`,
    });
  }

  return Object.values(grouped);
};
