import type { SingleBet } from "../../shared";
import type { UpdateBetsMatrix } from "../typings/atomics";

export const updateBets = (data: SingleBet[]) => {
  const pendingBets: SingleBet[] = data.filter((bet) => bet.won === null);
  const betTracker: UpdateBetsMatrix = [];

  for (const bet of pendingBets) {
    const items = bet.items;
    let update = true;
    let won = true;
    let odds = 1;

    items.forEach((item) => {
      if (item.won === null) {
        update = false;
      } else {
        won = won ? item.won : won;
        odds = odds * item.odds;
      }
    });

    if (!update) continue;
    const payout = odds * bet.stake + bet.bonus;
    const bankroll = won ? payout : 0;
    betTracker.push([bet.betId, won, bankroll]);
  }

  return betTracker;
};

// The bets to update are the first ones in the data array
const findBetIndex = (data: SingleBet[], id: string) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].betId === id) return i;
  }

  return null;
};

export const updateFormattedBets = (
  data: SingleBet[],
  matrix: UpdateBetsMatrix,
) => {
  for (let i = 0; i < matrix.length; i++) {
    const betId = matrix[i][0];
    const index = findBetIndex(data, betId);
    if (index === null) continue;
    data[index].won = matrix[i][1];
  }
};
