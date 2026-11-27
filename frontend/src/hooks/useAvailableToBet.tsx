import { useContext, useMemo } from "react";
import type { BetPool } from "../typings/interfaces";
import { leagues } from "../../../shared";
import { LeaguesContext } from "../context";

const useAvailableToBet = () => {
  const { cache } = useContext(LeaguesContext);

  const availableMatches = useMemo(() => {
    const result: BetPool = {};
    const now = Date.now();

    for (const leagueKey of leagues) {
      const leagueData = cache[leagueKey];
      if (!leagueData) continue;

      const nextRound = leagueData.nextRound;
      const matches = leagueData.rounds?.[nextRound] || {};
      result[leagueKey] = {};

      for (const key of Object.keys(matches)) {
        const m = matches[key];
        if (Date.parse(m.match_date) > now) {
          result[leagueKey][m.id] =
            `${m.home_team_name} vs ${m.away_team_name}`;
        }
      }
    }

    return result;
  }, []);

  return availableMatches;
};

export default useAvailableToBet;
