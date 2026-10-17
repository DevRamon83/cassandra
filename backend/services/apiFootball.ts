import type { SeasonSeed } from "../../shared/index.ts";
import { apiFootballLeagueDefiner } from "../helpers/defineLeague.ts";
import type { GithubSeasonData } from "../typings/GithubSeasonData.ts";

export async function apiFootball(data: SeasonSeed) {
  const { league, season } = data;
  const mySeason = season.substring(0, 4) + "-" + season.substring(7, 9);

  const myLeague = apiFootballLeagueDefiner(league);
  const baseUrl =
    "https://raw.githubusercontent.com/openfootball/football.json/master";
  const endpoint = `${mySeason}/${myLeague}.json`;

  try {
    const response = await fetch(`${baseUrl}/${endpoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return { error: true, errorMsg: "noResponse" };
    }

    const rawJson = await response.json();
    const data = rawJson as GithubSeasonData;

    return { error: false, errorMsg: undefined, data };
  } catch (err) {
    const error = err as Error;
    return { error: true, errorMsg: error.message, data: undefined };
  }
}
