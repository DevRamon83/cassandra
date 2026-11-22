import type { SingleBet } from "../../../shared";
import { classes } from "../constants/classes";
import { definePayout } from "../helpers/betData";
interface Props {
  bet: SingleBet;
}

export default function BetData({ bet }: Props) {
  const { bets } = classes;
  return (
    <>
      <div className={bets.betData}>
        <h4>Stake: {bet.stake}€</h4> <h4>Bonus: {bet.bonus}€</h4>
      </div>
      <div className={bets.payout}>Payout: {definePayout(bet)}€</div>
    </>
  );
}
