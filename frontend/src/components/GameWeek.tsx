import { useRef } from "react";
import type { Match } from "../../../shared";
import SingleMatch from "../ui/SingleMatch";
import useHorizontalScroll from "../hooks/useHorizontalScroll";

interface GameWeekProps {
  allMatches: {
    [matchId: string]: Match;
  };
}

export default function GameWeek({ allMatches }: GameWeekProps) {
  const ids = Object.keys(allMatches);
  const refContainer = useRef<HTMLDivElement>(null);

  const scrollToRight = useHorizontalScroll("left", refContainer);
  const scrollToLeft = useHorizontalScroll("right", refContainer);

  return (
    <div className="rounds__wrapper">
      <div className="rounds__scroller-left" onClick={scrollToLeft} />

      <div ref={refContainer} className="rounds__container">
        {ids.map((id) => (
          <SingleMatch key={`matchId__${id}`} match={allMatches[id]} />
        ))}
      </div>
      <div className="rounds__scroller-right" onClick={scrollToRight} />
    </div>
  );
}
