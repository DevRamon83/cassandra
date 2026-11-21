import { getCurrentSeason, type BetData, type NewBet } from "../../shared";
import { getPlaceholder } from "../helpers/getPlaceholder";

const prepareBetData = (bet: BetData[], userID: string) => {
  const matrix = [];
  for (let i = 0; i < bet.length; i++) {
    const item = bet[i];
    matrix.push([userID, item.matchId, item.odds, item.outcome]);
  }

  return matrix;
};

export const newBetQuery = (data: NewBet, userID: string) => {
  const season = getCurrentSeason();

  const normalizedItems = data.bet.map((item: BetData) => ({
    matchId: item.matchId,
    odds: item.odds,
    outcome: item.outcome.toLowerCase(),
  }));

  const items = prepareBetData(normalizedItems, userID);

  const placeholders = getPlaceholder(items, 4);

  const text = `
    WITH updated_bankroll AS (
      UPDATE bankroll
      SET current_budget = current_budget - $2
      WHERE user_id = $1
        AND season = $4
        AND current_budget >= $2
      RETURNING id
    ),
    inserted_bet AS (
      INSERT INTO bets (user_id, season, stake, bonus)
      SELECT $1, $4, $2, $3
      FROM updated_bankroll
      RETURNING id
    )
    INSERT INTO items (user_id, bet_id, match_id, odds, prediction)
    SELECT
      v.user_id::BIGINT,
      inserted_bet.id,
      v.match_id::BIGINT,
      v.odds::DECIMAL(5, 2),
      v.prediction::user_prediction
    FROM inserted_bet
    CROSS JOIN (
      VALUES
      ${placeholders}
    ) AS v(user_id, match_id, odds, prediction)
    RETURNING bet_id;
  `;

  const values = [userID, data.stake, data.bonus, season, ...items.flat()];

  return { text, values };
};
