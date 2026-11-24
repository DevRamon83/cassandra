import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData.ts";
import type { StandardResponse } from "../../typings/apiInterfaces.ts";

const predictions = async () => {
  const { base, bet } = API_URLS;
  const apiUrl = base + bet.predictions;

  const method = "POST";
  const credentials = "include";
  const response = await fetchData<StandardResponse>(
    apiUrl,
    method,
    credentials,
    null,
  );

  return response;
};

export default predictions;
