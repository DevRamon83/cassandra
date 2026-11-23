import { useContext } from "react";
import useUpdateContext from "../hooks/useUpdateContext.tsx";
import LeagueStandings from "../ui/LeagueStandings.tsx";
import Matches from "./Matches.tsx";
import RefreshCache from "./admin/RefreshCache.tsx";
import type { LeagueProps } from "../../../shared/index.ts";
import Predictions from "./admin/Predictions.tsx";
import { AuthContext, LeaguesContext } from "../context/index.ts";
import UpdatePredictions from "./admin/UpdatePredictions.tsx";
import { classes } from "../constants/classes.ts";

export default function League({ league, season }: LeagueProps) {
  const { cache, setCache } = useContext(LeaguesContext);
  const { auth } = useContext(AuthContext);
  useUpdateContext(league, season, cache, setCache);
  const myLeague = cache[league] || null;

  const positions = myLeague?.positions || [];
  const isAdmin = auth?.username === "admin";

  return (
    <>
      {isAdmin && (
        <div className={classes.dashboard.adminContainer}>
          <RefreshCache league={league} season={season} />
          <Predictions league={league} season={season} />
          <UpdatePredictions />
        </div>
      )}

      {myLeague && positions.length !== 0 && (
        <>
          <Matches myLeague={myLeague} league={league} />
          <LeagueStandings positions={positions} myLeague={myLeague} />
        </>
      )}
    </>
  );
}
