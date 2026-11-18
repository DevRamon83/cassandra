import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData.ts";
import type { StandardResponse } from "../../typings/apiInterfaces.ts";
import type { LeagueProps } from "../../../../shared/index.ts";

const predictions = async (data: LeagueProps) => {
  const { base, bet } = API_URLS;
  const apiUrl = base + bet.predictions;

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

export default predictions;
