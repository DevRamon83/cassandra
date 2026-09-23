import type { Interfaces } from "../../../../shared/index.ts";
import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData";
import type { StandardResponse } from "../../interfaces/standardRespGeneric.ts";

const matchSeed = async (data: Interfaces.GameWeek) => {
  const { base, matchSeed } = API_URLS;
  const apiUrl = base + matchSeed.newMatch;

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

export default matchSeed;
