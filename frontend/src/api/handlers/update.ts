import type { SeasonSeed } from "../../../../shared/index.ts";
import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData.ts";
import type { StandardResponse } from "../../interfaces/generics.ts";

const update = async (data: SeasonSeed) => {
  const { base, apiFootball } = API_URLS;
  const apiUrl = base + apiFootball.update;

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

export default update;
