import { useEffect, useState } from "react";
import { type LeagueData } from "../../../shared/index";
import GameWeek from "./GameWeek.tsx";
import RoundsNavigator from "./RoundsNavigator.tsx";

interface MatchesProps {
  myLeague: LeagueData;
  league: string;
}

export default function Matches({ myLeague, league }: MatchesProps) {
  const lastGame = myLeague.nextRound - 1;
  const [show, setShow] = useState(lastGame);

  useEffect(() => {
    setShow(lastGame);
  }, [league]);

  return (
    <>
      <RoundsNavigator show={show} setShow={setShow} league={league} />

      <GameWeek key={league} allMatches={myLeague.rounds[show]} />
    </>
  );
}
