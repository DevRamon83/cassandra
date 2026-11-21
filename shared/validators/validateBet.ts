import { outcomes } from "../constants/atomics";
import { isPositiveNum, notANum, notAString } from "../guards/atomics";
import type { NewBet } from "../typings/atomics";

export const validateBet = (data: NewBet) => {
  const dataKeys = Object.keys(data);
  const error = true;

  if (dataKeys.length !== 3) return { error };

  if (notANum(data.bonus)) return { error };
  if (data.bonus < 0) return { error };

  if (notANum(data.stake)) return { error };
  if (!isPositiveNum(data.stake)) return { error };
  if (data.stake >= 100) return { error };

  const items = data.bet;
  if (!Array.isArray(items) || items.length === 0) return { error };

  for (const item of items) {
    const itemKeys = Object.keys(item);
    if (itemKeys.length !== 3) return { error };

    const outcome = item.outcome;
    if (!outcomes.includes(outcome)) return { error };

    if (notANum(item.odds)) return { error };
    if (!isPositiveNum(item.odds)) return { error };

    if (notAString(item.matchId, "matchId")) return { error };
  }

  return { error: false };
};
