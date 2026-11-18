import { API_URLS } from "../../constants/apiUrls.ts";
import type { PredictionsResponse } from "../../typings/apiInterfaces.ts";
import { fetchData } from "../fetchData.ts";

const getPredictions = async (signal: AbortSignal) => {
  const { base, bet } = API_URLS;
  const apiUrl = base + bet.predictions;

  const method = "GET";
  const credentials = "include";
  const response = await fetchData<PredictionsResponse>(
    apiUrl,
    method,
    credentials,
    null,
    { signal },
  );

  return response;
};

export default getPredictions;
