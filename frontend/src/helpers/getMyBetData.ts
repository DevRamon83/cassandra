import type { BetSlipPool } from "../typings/interfaces";

export const getMyBetData = (betSlipPool: BetSlipPool[]) => {
  const yourBet = [];
  for (const bet of betSlipPool) {
    const betData = {
      outcome: bet.uuid.replace(`${bet.id}-`, ""),
      odds: Number(bet.odds),
      matchId: bet.id,
    };
    yourBet.push(betData);
  }

  return yourBet;
};
