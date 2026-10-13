import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData.ts";
import type { AuthResponse } from "../../interfaces/generics.ts";

const logout = async () => {
  const { base, auth } = API_URLS;
  const apiUrl = base + auth.logout;

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

export default logout;
