import { API_URLS } from "../../constants/apiUrls.ts";
import { fetchData } from "../fetchData.ts";
import type { AuthResponse } from "../../typings/apiInterfaces.ts";

interface Data {
  id: string;
  budget: number;
}

const bankrollApiHandler = async (data: Data) => {
  const { base, bet } = API_URLS;
  const apiUrl = base + bet.bankroll;

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

export default bankrollApiHandler;
