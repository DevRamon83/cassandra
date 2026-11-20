import type { Dispatch, SetStateAction } from "react";
import { getCurrentSeason, getNextRound, leagues } from "../../../shared";
import read from "../api/handlers/read";
import { getPositions } from "../helpers/getLeagueData";
import type { ErrorResponse } from "../typings/apiInterfaces";

export const retrieveLeagues = async (
  leaguesInCache: string[],
  setCache: Dispatch<SetStateAction<Record<string, any>>>,
  signal: AbortSignal,
): Promise<ErrorResponse> => {
  const season = getCurrentSeason();
  let error = false;
  let aborted = false;

  for (const league of leagues) {
    if (leaguesInCache.includes(league)) continue;
    const res = await read({ league, season }, signal);

    if (res.error || res.aborted) {
      error = true;
      aborted = aborted ? aborted : res?.aborted;
      continue;
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
  }

  return { error, aborted };
};
