import type { Interfaces } from "../../../../shared/index.ts";
import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData.ts";
import type { StandardResponse } from "../../interfaces/standardRespGeneric.ts";

const read = async (data: Interfaces.SeasonSeed) => {
  const { base, apiFootball } = API_URLS;
  const { league, season } = data;
  const apiUrl = `${base}${apiFootball.leagueData}?league=${league}&season=${season}`;

  const method = "GET";
  const credentials = "include";
  const response = await fetchData<StandardResponse>(
    apiUrl,
    method,
    credentials,
    null,
  );

  return response;
};

export default read;
