import { useContext } from "react";
import UseUpdateContext from "../hooks/UseUpdateContext.tsx";
import { LeaguesCache } from "../App";
import LeagueStandings from "../ui/LeagueStandings.tsx";
import Matches from "./Matches.tsx";
import UpdateSeason from "./UpdateSeason.tsx";
import type { LeagueProps } from "../../../shared/index.ts";

export default function League({ league, season }: LeagueProps) {
  const { cache, setCache } = useContext(LeaguesCache);
  UseUpdateContext(league, season, cache, setCache);
  const myLeague = cache[league] || null;

  const positions = myLeague?.positions || [];

  return (
    <>
      <UpdateSeason league={league} season={season} />
      {myLeague && positions.length !== 0 && (
        <>
          <Matches positions={positions} myLeague={myLeague} league={league} />
          <LeagueStandings positions={positions} myLeague={myLeague} />
        </>
      )}
    </>
  );
}
