import { useContext, useState } from "react";
import { classes } from "../../constants/classes";
import useAvailableToBet from "../../hooks/useAvailableToBet";
import { leagues, type SingleBet } from "../../../../shared";
import BetSlip from "./BetSlip";
import type { BetSlipPool } from "../../typings/interfaces";
import { LeaguesContext } from "../../context";
import BetLeagueMenu from "../../ui/BetLeagueMenu";
import BetOutcomes from "./BetOutcomes";

interface Props {
  cassandraBet: SingleBet[];
}

export default function NewBet({ cassandraBet }: Props) {
  const [league, setLeague] = useState(leagues[0]);
  const { cache } = useContext(LeaguesContext);
  const weeks = 38 - cache[league].nextRound;
  const [copyBet, setCopyBet] = useState(false);

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

  const resetCopyBet = () => {
    setBetSlipPool([]);
    setCopyBet(false);
  };

  return (
    <div className={bets.container}>
      <div className={bets.selection}>
        <BetLeagueMenu
          leagues={leagues}
          league={league}
          setLeague={setLeague}
        />
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
              copyBet={copyBet}
              resetCopyBet={resetCopyBet}
            />
          </div>
        ))}
      </div>
      <BetSlip
        betSlipPool={betSlipPool}
        oddHandler={oddHandler}
        removeHandler={removeHandler}
        setBetSlipPool={setBetSlipPool}
        weeks={weeks}
        cassandraBet={cassandraBet}
        setCopyBet={setCopyBet}
      />
    </div>
  );
}
