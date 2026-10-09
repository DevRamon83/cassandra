import { useEffect, useState } from "react";
import { type LeagueData } from "../../../shared/index";
import GameWeek from "./GameWeek.tsx";
import RoundsNavigator from "./RoundsNavigator.tsx";

interface MatchesProps {
  positions: string[];
  myLeague: LeagueData;
  league: string;
}

export default function Matches({ positions, myLeague, league }: MatchesProps) {
  const randomTeam: string = positions[0];
  const lastGame = myLeague.standings[randomTeam].played;
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
