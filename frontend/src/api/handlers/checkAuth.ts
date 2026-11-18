import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData.ts";
import type { AuthResponse } from "../../typings/apiInterfaces.ts";

const checkAuth = async () => {
  const { base, auth } = API_URLS;
  const apiUrl = base + auth.check;

  const method = "GET";
  const credentials = "include";
  const response = await fetchData<AuthResponse>(
    apiUrl,
    method,
    credentials,
    null,
  );

  return response;
};

export default checkAuth;
