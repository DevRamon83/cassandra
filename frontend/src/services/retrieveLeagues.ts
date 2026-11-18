import type { Dispatch, SetStateAction } from "react";
import { getCurrentSeason, leagues } from "../../../shared";
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
    const resp = await read({ league, season }, signal);

    if (resp.error || resp.aborted) {
      error = true;
      aborted = aborted ? aborted : resp?.aborted;
      continue;
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
  }

  return { error, aborted };
};
