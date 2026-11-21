import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData.ts";
import type { MyBetsResponse } from "../../typings/apiInterfaces.ts";

const allBets = async (signal: AbortSignal) => {
  const { base, bet } = API_URLS;
  const apiUrl = base + bet.myBets;

  const method = "GET";
  const credentials = "include";
  const response = await fetchData<MyBetsResponse>(
    apiUrl,
    method,
    credentials,
    null,
    { signal },
  );

  return response;
};

export default allBets;
