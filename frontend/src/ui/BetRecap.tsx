import type { Dispatch, SetStateAction } from "react";
import { classes } from "../constants/classes";

interface Props {
  totalOdds: number;
  stake: string;
  setStake: Dispatch<SetStateAction<string>>;
  bonus: string;
  setBonus: Dispatch<SetStateAction<string>>;
  potentialWin: number;
  error: string;
}

export default function BetRecap({
  totalOdds,
  stake,
  setStake,
  bonus,
  setBonus,
  potentialWin,
  error,
}: Props) {
  const { bets } = classes;
  return (
    <div className={bets.betRecap}>
      <h4>
        Odds <span>{totalOdds.toFixed(2)}</span>
      </h4>

      <input
        type="number"
        step="1"
        min="1"
        placeholder="Stake"
        value={stake}
        onChange={(e) => setStake(e.target.value)}
      />
      <input
        type="number"
        step="1"
        min="1"
        placeholder="Multi Bet Bonus"
        value={bonus}
        onChange={(e) => setBonus(e.target.value)}
      />
      {potentialWin > 0 && !error && (
        <h4>
          Payout <span>{potentialWin.toFixed(2)}€</span>
        </h4>
      )}
    </div>
  );
}
