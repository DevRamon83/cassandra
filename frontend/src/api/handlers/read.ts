import type { SeasonSeed } from "../../../../shared/index.ts";
import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData.ts";
import type { LeagueResponse } from "../../interfaces/standardRespGeneric.ts";

const read = async (data: SeasonSeed, signal: AbortSignal) => {
  const { base, apiFootball } = API_URLS;
  const { league, season } = data;
  const apiUrl = `${base}${apiFootball.leagueData}?league=${league}&season=${season}`;

  const method = "GET";
  const credentials = "include";
  const response = await fetchData<LeagueResponse>(
    apiUrl,
    method,
    credentials,
    null,
    { signal },
  );

  return response;
};

export default read;
