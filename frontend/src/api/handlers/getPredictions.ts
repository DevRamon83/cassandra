import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData.ts";
import type { LeagueResponse } from "../../typings/generics.ts";

const getPredictions = async (signal: AbortSignal) => {
  const { base, bet } = API_URLS;
  const apiUrl = base + bet.predictions;

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

export default getPredictions;
