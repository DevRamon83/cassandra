import type { SingleBet } from "../../../shared";
import { classes } from "../constants/classes";
import { defineBetStatus } from "../helpers/betData";

interface Props {
  bet: SingleBet;
}

export default function BetItems({ bet }: Props) {
  const { bets } = classes;
  return (
    <>
      {bet.items.map((item) => (
        <div
          className={bets.predictionRow}
          key={`${item.matchId}-${item.outcome}`}
        >
          <div
            className={`${bets.predictionOutcome}-${defineBetStatus(item.won).replace("bets__", "")}`}
          ></div>{" "}
          {item.match}: {item.outcome} ({item.odds})
        </div>
      ))}
    </>
  );
}
