import { useEffect, useState } from "react";
import type { LeagueData } from "../../../shared";

export const useOverride = (myLeague: LeagueData) => {
  const [json, setJson] = useState<string>("");

  useEffect(() => {
    if (myLeague) {
      const randomTeam = myLeague.positions[0];
      const nextRound = myLeague.standings[randomTeam].played + 1;
      const updateMatches = myLeague.rounds[nextRound];
      const roundJSON = JSON.stringify(updateMatches, null, 2);

      setJson(roundJSON);
    }
  }, [myLeague]);

  return { json, setJson };
};
