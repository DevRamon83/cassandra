import type { Override } from "../../../../shared/index.ts";
import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData.ts";
import type { StandardResponse } from "../../typings/generics.ts";

const override = async (data: Override) => {
  const { base, apiFootball } = API_URLS;
  const apiUrl = base + apiFootball.override;

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

export default override;
