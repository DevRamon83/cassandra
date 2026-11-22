import { useContext, useMemo, useState } from "react";
import { useUserBets } from "../../hooks/useUserBets";
import { BetsContext } from "../../context";
import Spinner from "../../ui/Spinner";
import { classes } from "../../constants/classes";
import { defineBetStatus } from "../../helpers/betData";
import BetItems from "../../ui/BetItems";
import BetData from "../../ui/BetData";
import BetFilter from "../../ui/BetFilter";
import type { SingleBet } from "../../../../shared";

export default function BetsHistory() {
  const [ready, setReady] = useState("wait");
  const [filter, setFilter] = useState("all");
  useUserBets(setReady);
  const { userBets } = useContext(BetsContext);

  const filteredBets = useMemo(() => {
    if (!userBets) return [];

    return userBets.filter((bet: SingleBet) => {
      if (filter === "all") return true;
      if (filter === "pending") return bet.won === null;
      if (filter === "won") return bet.won === true;
      if (filter === "lost") return bet.won === false;
      return true;
    });
  }, [userBets, filter]);

  const { bets } = classes;

  return (
    <div className={bets.historyContainer}>
      {ready === "wait" ? (
        <Spinner />
      ) : (
        <>
          {userBets && userBets.length > 0 ? (
            <>
              <h2>Filter your bets</h2>
              <BetFilter value={filter} setter={setFilter} />
              {filteredBets.map((bet) => (
                <div
                  className={`${bets.historyCard} ${defineBetStatus(bet.won)}`}
                  key={bet.betId}
                >
                  <BetItems bet={bet} />
                  <BetData bet={bet} />
                </div>
              ))}
            </>
          ) : (
            <div>Do your first bet</div>
          )}
        </>
      )}
    </div>
  );
}
