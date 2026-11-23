import { useContext, useState } from "react";
import { classes } from "../../constants/classes";
import useAvailableToBet from "../../hooks/useAvailableToBet";
import { leagues } from "../../../../shared";
import AvailableToBet from "../../ui/AvailableToBet";
import BetSlip from "./BetSlip";
import type { BetSlipPool } from "../../typings/interfaces";
import { LeaguesContext } from "../../context";

export default function NewBet() {
  const [league, setLeague] = useState(leagues[0]);
  const { cache } = useContext(LeaguesContext);
  const weeks = 38 - cache[league].nextRound;

  const [betSlipPool, setBetSlipPool] = useState<BetSlipPool[]>([]);

  const availableMatches = useAvailableToBet();
  const availableIds = Object.keys(availableMatches[league]!);

  const { bets } = classes;
  const betHandler = (id: string, outcome: string) => {
    const nextRound = cache[league].nextRound;
    const newMatch = {
      uuid: `${id}-${outcome}`,
      odds: "",
      id,
      homeTeam: cache[league].rounds[nextRound][id].home_team_name,
      awayTeam: cache[league].rounds[nextRound][id].away_team_name,
    };

    setBetSlipPool((prev) => [...prev, newMatch]);
  };

  const activeUuids = new Set(betSlipPool.map((m) => m.uuid));

  const oddHandler = (uuid: string, value: string) => {
    setBetSlipPool((prev) =>
      prev.map((m) => (m.uuid === uuid ? { ...m, odds: value } : m)),
    );
  };

  const removeHandler = (uuid: string) => {
    setBetSlipPool((prev) => prev.filter((m) => m.uuid !== uuid));
  };

  return (
    <>
      <div className={bets.container}>
        <AvailableToBet
          leagues={leagues}
          league={league}
          setLeague={setLeague}
          availableIds={availableIds}
          availableMatches={availableMatches}
          betHandler={betHandler}
          activeUuids={activeUuids}
        />
        <BetSlip
          betSlipPool={betSlipPool}
          oddHandler={oddHandler}
          removeHandler={removeHandler}
          setBetSlipPool={setBetSlipPool}
          weeks={weeks}
        />
      </div>
    </>
  );
}
