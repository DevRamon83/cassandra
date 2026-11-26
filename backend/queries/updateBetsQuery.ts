import { getPlaceholder } from "../helpers/getPlaceholder";
import type { UpdateBetsMatrix } from "../typings/atomics";

export const updateBetsQuery = (matrix: UpdateBetsMatrix, userId: string) => {
  const bankroll = matrix.reduce((acc, data) => acc + data[2], 0);

  const betsData = matrix.map(([betId, won]) => [betId, won]);

  const placeholders = getPlaceholder(betsData, 2);

  const sqlQuery = `
    WITH updated_bankroll AS (
      UPDATE bankroll
      SET current_budget = current_budget + $1::numeric
      WHERE user_id = $2::bigint
    )
    UPDATE bets AS b
    SET won = v.won::boolean
    FROM (VALUES ${placeholders}) AS v(id, won)
    WHERE b.id = v.id::bigint;
  `;

  return {
    text: sqlQuery,
    values: [bankroll, userId, ...betsData.flat()],
  };
};
