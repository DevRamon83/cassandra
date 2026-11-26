import type { SingleBet } from "../../../shared";
import { definePayout } from "./betData";

export const cassandraData = (bets: SingleBet[]) => {
  const total = bets.length;
  const won = bets.filter((bet) => bet.won);
  const wonLength = won.length;
  const cassandraWinnings = wonLength ? (wonLength / total) * 100 : 0;
  let totalStake = 0;
  let totalPayout = 0;
  for (const bet of bets) {
    totalStake += bet.stake;

    if (bet.won) {
      const payout = definePayout(bet);
      totalPayout += Number(payout);
    }
  }

  const netBalance = totalPayout - totalStake;
  const roundedBalance = netBalance.toFixed(1);
  const balance = `${roundedBalance}€`;

  return { total, cassandraWinnings, balance };
};
