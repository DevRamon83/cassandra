import { useState } from "react";
import { outcomes } from "../../../../shared";
import { classes } from "../../constants/classes";

interface Props {
  matchId: string;
  betHandler: (matchId: string, outcome: string) => void;
  activeUuids: Set<string>;
  copyBet: boolean;
  resetCopyBet: () => void;
}

const MARKETS = [
  ["1", "X", "2"],
  ["UNDER", "OVER"],
  ["GOAL", "NOGOAL"],
];

const alertText = "You cannot add new matches while copying Cassandra's bet.";

export default function BetOutcomes({
  matchId,
  betHandler,
  activeUuids,
  copyBet,
  resetCopyBet,
}: Props) {
  const [alert, setAlert] = useState("");

  const handler = (matchId: string, outcome: string) => {
    if (copyBet) return setAlert(alertText);
    const sameMarket = MARKETS.find((group) => group.includes(outcome)) ?? [];
    const isBlocked = sameMarket.some((opt) =>
      activeUuids.has(`${matchId}-${opt}`),
    );

    if (isBlocked) return;

    betHandler(matchId, outcome);
  };

  const resetHandler = () => {
    setAlert("");
    resetCopyBet();
  };

  const { bets } = classes;
  return (
    <div className={bets.outcomeContainer}>
      {alert ? (
        <div className={bets.alert}>
          <h3>{alert}</h3>
          <h4>Do you want annul copy bet?</h4>
          <div className={bets.btnsContainer}>
            <button className={bets.alertBtn} onClick={resetHandler}>
              Yes
            </button>
            <button className={bets.alertBtn} onClick={() => setAlert("")}>
              No
            </button>
          </div>
        </div>
      ) : (
        <>
          {outcomes.map((outcome) => (
            <button
              className={`${bets.outcome}${activeUuids.has(`${matchId}-${outcome}`) ? "-active" : ""}`}
              onClick={() => handler(matchId, outcome)}
              key={outcome}
            >
              {outcome}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
