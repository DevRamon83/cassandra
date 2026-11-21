import { outcomes } from "../../../shared";
import { classes } from "../constants/classes";

interface Props {
  matchId: string;
  betHandler: (matchId: string, outcome: string) => void;
  activeUuids: Set<string>;
}

const MARKETS = [
  ["1", "X", "2"],
  ["UNDER", "OVER"],
  ["GOAL", "NOGOAL"],
];

export default function BetOutcomes({
  matchId,
  betHandler,
  activeUuids,
}: Props) {
  const handler = (matchId: string, outcome: string) => {
    const sameMarket = MARKETS.find((group) => group.includes(outcome)) ?? [];
    const isBlocked = sameMarket.some((opt) =>
      activeUuids.has(`${matchId}-${opt}`),
    );

    if (isBlocked) return;

    betHandler(matchId, outcome);
  };

  const { bets } = classes;
  return (
    <div className={bets.outcomeContainer}>
      {outcomes.map((outcome) => (
        <button
          className={`${bets.outcome}${activeUuids.has(`${matchId}-${outcome}`) ? "-active" : ""}`}
          onClick={() => handler(matchId, outcome)}
          key={outcome}
        >
          {outcome}
        </button>
      ))}
    </div>
  );
}
