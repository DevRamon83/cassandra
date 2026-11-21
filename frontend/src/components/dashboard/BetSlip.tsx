import { classes } from "../../constants/classes";
import type { BetSlipPool } from "../../typings/interfaces";
import Odds from "../../ui/Odds";

interface Props {
  betSlipPool: BetSlipPool[];
  oddHandler: (uuid: string, value: string) => void;
  removeHandler: (uuid: string) => void;
}

export default function BetSlip({
  betSlipPool,
  oddHandler,
  removeHandler,
}: Props) {
  const { bets } = classes;
  return (
    <div className={bets.betSlip}>
      {betSlipPool.map((match) => (
        <div key={`${match.uuid}`} className={bets.row}>
          <div className={bets.rowElement}>
            {match.homeTeam} Vs {match.awayTeam}:{" "}
            {match.uuid.replace(`${match.id}-`, "")}
          </div>
          <Odds
            value={match.odd}
            oddHandler={oddHandler}
            removeHandler={removeHandler}
            uuid={match.uuid}
          />
        </div>
      ))}

      <div>test</div>
    </div>
  );
}
