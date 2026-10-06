import { useRef } from "react";
import type { Match } from "../../../shared";
import SingleMatch from "../ui/SingleMatch";
import useHorizontalScroll from "../hooks/useHorizontalScroll";
import { classes } from "../constants/classes";

interface GameWeekProps {
  allMatches: {
    [matchId: string]: Match;
  };
}

export default function GameWeek({ allMatches }: GameWeekProps) {
  const ids = Object.keys(allMatches);
  const refContainer = useRef<HTMLDivElement>(null);
  const { rounds } = classes;

  const scrollToRight = useHorizontalScroll("left", refContainer);
  const scrollToLeft = useHorizontalScroll("right", refContainer);

  return (
    <div className={rounds.wrapper}>
      <div className={rounds.leftScroll} onClick={scrollToLeft} />

      <div ref={refContainer} className={rounds.container}>
        {ids.map((id) => (
          <SingleMatch key={`matchId__${id}`} match={allMatches[id]} />
        ))}
      </div>
      <div className={rounds.scrollRight} onClick={scrollToRight} />
    </div>
  );
}
