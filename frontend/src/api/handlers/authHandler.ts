import type { AuthInterface } from "../../../../shared/index.ts";
import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData.ts";
import type { AuthResponse } from "../../interfaces/generics.ts";

const authHandler = async (data: AuthInterface, endpoint: string) => {
  const { base, auth } = API_URLS;
  const apiUrl = base + auth[endpoint as keyof typeof auth];

  const method = "POST";
  const credentials = "include";
  const response = await fetchData<AuthResponse>(
    apiUrl,
    method,
    credentials,
    data,
  );

  return response;
};

export default authHandler;
