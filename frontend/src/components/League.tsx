import { useContext } from "react";
import UseUpdateContext from "../hooks/UseUpdateContext.tsx";
import { AuthContext, LeaguesCache } from "../App";
import LeagueStandings from "../ui/LeagueStandings.tsx";
import Matches from "./Matches.tsx";
import UpdateSeason from "./admin/UpdateSeason.tsx";
import type { LeagueProps } from "../../../shared/index.ts";
import OverrideUpdate from "./admin/OverrideUpdate.tsx";

export default function League({ league, season }: LeagueProps) {
  const { cache, setCache } = useContext(LeaguesCache);
  const { logged } = useContext(AuthContext);
  UseUpdateContext(league, season, cache, setCache);
  const myLeague = cache[league] || null;

  const positions = myLeague?.positions || [];
  const isAdmin = logged === "admin";

  return (
    <>
      {isAdmin && (
        <>
          <UpdateSeason league={league} season={season} />
          <OverrideUpdate league={league} season={season} myLeague={myLeague} />
        </>
      )}

      {myLeague && positions.length !== 0 && (
        <>
          <Matches positions={positions} myLeague={myLeague} league={league} />
          <LeagueStandings positions={positions} myLeague={myLeague} />
        </>
      )}
    </>
  );
}
