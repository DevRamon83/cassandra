import type { NewBet } from "../../../../shared/index.ts";
import { API_URLS } from "../../constants/apiUrls.ts";
import type { NewBetResponse } from "../../typings/apiInterfaces.ts";
import { fetchData } from "../fetchData.ts";

const newBet = async (data: NewBet) => {
  const { base, bet } = API_URLS;
  const apiUrl = base + bet.new;

  const method = "POST";
  const credentials = "include";
  const response = await fetchData<NewBetResponse>(
    apiUrl,
    method,
    credentials,
    data,
  );

  return response;
};

export default newBet;
