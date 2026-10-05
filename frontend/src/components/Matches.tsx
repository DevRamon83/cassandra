import { useState } from "react";
import { type LeagueData } from "../../../shared/index";
import GameWeek from "./GameWeek.tsx";

interface MatchesProps {
  positions: string[];
  myLeague: LeagueData;
}

export default function Matches({ positions, myLeague }: MatchesProps) {
  const randomTeam: string = positions[0];
  const lastGame = myLeague.standings[randomTeam].played;
  const [show, setShow] = useState(lastGame);
  const matches = Object.keys(myLeague.rounds);
  const round = myLeague.rounds[lastGame];

  console.log(round);

  return (
    <>
      <div className="rounds__main">
        {matches.map((match) => (
          <div
            className={
              parseInt(match) === show ? "rounds__current" : "rounds__tabs"
            }
            key={match}
            onClick={() => setShow(parseInt(match))}
          >
            {match}
          </div>
        ))}
      </div>
      <GameWeek allMatches={myLeague.rounds[show]} />
    </>
  );
}
