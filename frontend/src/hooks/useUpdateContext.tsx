import { useEffect } from "react";
import read from "../api/handlers/read.ts";
import { getPositions } from "../helpers/getLeagueData.ts";
import type { Dispatch, SetStateAction } from "react";
import { getNextRound } from "../../../shared/helpers.ts";

const useUpdateContext = (
  league: string,
  season: string,
  cache: Record<string, any>,
  setCache: Dispatch<SetStateAction<Record<string, any>>>,
) => {
  useEffect(() => {
    const getData = async (signal: AbortSignal) => {
      const res = await read({ league, season }, signal);

      if (!res || res.error || res.aborted) {
        return;
      }

      const positions = getPositions(res.standings);

      const nextRound = getNextRound(res.standings);

      setCache((prev: Record<string, any>) => ({
        ...prev,
        [league]: {
          positions,
          standings: res.standings,
          rounds: res.rounds,
          nextRound,
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

export default useUpdateContext;
