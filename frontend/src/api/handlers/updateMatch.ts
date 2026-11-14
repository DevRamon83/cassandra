import type { Match } from "../../../../shared/index.ts";
import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData.ts";
import type { StandardResponse } from "../../typings/generics.ts";

const updateMatch = async (data: Match) => {
  const { base, apiFootball } = API_URLS;
  const apiUrl = base + apiFootball.update;

  const method = "PATCH";
  const credentials = "include";
  const response = await fetchData<StandardResponse>(
    apiUrl,
    method,
    credentials,
    data,
  );

  return response;
};

export default updateMatch;
