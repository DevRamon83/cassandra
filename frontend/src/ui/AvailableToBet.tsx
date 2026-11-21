import type { Dispatch, SetStateAction } from "react";
import { classes } from "../constants/classes";
import BetLeagueMenu from "./BetLeagueMenu";
import BetOutcomes from "./BetOutcomes";
import type { BetPool } from "../typings/interfaces";

interface Props {
  league: string;
  setLeague: Dispatch<SetStateAction<string>>;
  leagues: string[];
  betHandler: (matchId: string, outcome: string) => void;
  activeUuids: Set<string>;
  availableIds: string[];
  availableMatches: BetPool;
}

export default function AvailableToBet({
  leagues,
  league,
  setLeague,
  availableIds,
  availableMatches,
  betHandler,
  activeUuids,
}: Props) {
  const { bets } = classes;

  return (
    <div className={bets.selection}>
      <BetLeagueMenu leagues={leagues} league={league} setLeague={setLeague} />
      {availableIds.map((matchId, index) => (
        <div
          className={`${bets.match}${index % 2 !== 0 ? "-odd" : "-even"}`}
          key={matchId}
        >
          <h3>{availableMatches[league]![matchId]}</h3>
          <BetOutcomes
            matchId={matchId}
            betHandler={betHandler}
            activeUuids={activeUuids}
          />
        </div>
      ))}
    </div>
  );
}
