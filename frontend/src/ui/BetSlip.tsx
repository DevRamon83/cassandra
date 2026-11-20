import { classes } from "../constants/classes";
import Odds from "./Odds";

interface Props {
  betPool: any[];
  oddHandler: (uuid: string, value: string) => void;
  removeHandler: (uuid: string) => void;
}

export default function BetSlip({ betPool, oddHandler, removeHandler }: Props) {
  const { bets } = classes;
  return (
    <div className={bets.betSlip}>
      {betPool.map((match) => (
        <div key={`${match.uuid}`} className={bets.row}>
          <div className={bets.rowElement}>
            {match.home_team_name} Vs {match.away_team_name}:{" "}
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
    </div>
  );
}
