import type { SingleBet } from "../../../shared";
import { classes } from "../constants/classes";

export const defineBetStatus = (betStatus: boolean | null) => {
  if (betStatus === null) return classes.bets.pending;
  if (betStatus) return classes.bets.won;
  return classes.bets.lost;
};

export const definePayout = (bet: SingleBet) => {
  const odds: number[] = bet.items.map((bet) => Number(bet.odds));
  const totalOdds = odds.reduce((acc, odd) => acc * odd, 1);
  return totalOdds * bet.stake + bet.bonus;
};
