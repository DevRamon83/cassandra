import type { Dispatch, SetStateAction } from "react";
import { classes } from "../constants/classes";

interface Props {
  league: string;
  setLeague: Dispatch<SetStateAction<string>>;
  leagues: string[];
}

export default function BetLeagueMenu({ league, setLeague, leagues }: Props) {
  const { bets } = classes;
  return (
    <div className={bets.flagContainer}>
      {leagues.map((flag) => (
        <button
          className={`${bets.flag}${league === flag ? "-active" : ""}`}
          key={flag}
          onClick={() => setLeague(flag)}
        >
          <img src={`/${flag}.svg`} />
        </button>
      ))}
    </div>
  );
}
