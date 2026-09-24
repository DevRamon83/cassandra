import type { Interfaces } from "../../../../shared/index.ts";
import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData";
import type { StandardResponse } from "../../interfaces/standardRespGeneric.ts";

const seasonSeed = async (data: Interfaces.GameWeek) => {
  const { base, apiFootball } = API_URLS;
  const apiUrl = base + apiFootball.newSeason;

  const method = "POST";
  const credentials = "include";
  const response = await fetchData<StandardResponse>(
    apiUrl,
    method,
    credentials,
    data,
  );

  return response;
};

export default seasonSeed;
