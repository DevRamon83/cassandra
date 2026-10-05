import { useContext } from "react";
import UseUpdateContext from "../hooks/UseUpdateContext.tsx";
import { LeaguesCache } from "../App";
import LeagueStandings from "../ui/LeagueStandings.tsx";
import Matches from "./Matches.tsx";

interface LeagueProps {
  league: string;
  season: string;
}

export default function League({ league, season }: LeagueProps) {
  const { cache, setCache } = useContext(LeaguesCache);
  UseUpdateContext(league, season, cache, setCache);
  const myLeague = cache[league] || null;

  const positions = myLeague?.positions || [];

  return (
    <>
      {myLeague && (
        <>
          <Matches positions={positions} myLeague={myLeague} />
          <LeagueStandings positions={positions} myLeague={myLeague} />
        </>
      )}
    </>
  );
}
