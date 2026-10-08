import { useEffect } from "react";
import read from "../api/handlers/read";
import { getPositions } from "../helpers/getLeagueData.ts";
import type { Dispatch, SetStateAction } from "react";

const UseUpdateContext = (
  league: string,
  season: string,
  cache: Record<string, any>,
  setCache: Dispatch<SetStateAction<Record<string, any>>>,
) => {
  useEffect(() => {
    const getData = async (signal: AbortSignal) => {
      const resp = await read({ league, season }, signal);

      if (!resp || resp.error || resp.aborted) {
        return;
      }

      const positions = getPositions(resp.standings);

      setCache((prev: Record<string, any>) => ({
        ...prev,
        [league]: {
          positions,
          standings: resp.standings,
          rounds: resp.rounds,
        },
      }));
    };

    const controller = new AbortController();

    if (!cache[league]) {
      getData(controller.signal);
    }

    return () => controller.abort();
  }, [league]);
};

export default UseUpdateContext;
